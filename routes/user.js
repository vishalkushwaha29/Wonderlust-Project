const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Otp = require("../models/otp.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const { generateOtp, sendOtpEmail } = require("../utils/sendEmail.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let registeredUser;
    try {
      let { username, email, password } = req.body;

      // If a previous signup attempt left behind an unverified account
      // with this username/email (e.g. because the OTP email failed to
      // send), clean it up so this attempt isn't blocked by it.
      const stale = await User.findOne({ $or: [{ username }, { email }] });
      if (stale && !stale.isVerified) {
        await User.deleteOne({ _id: stale._id });
        await Otp.deleteMany({ email: stale.email, purpose: "signup" });
      }

      const newUser = new User({ email, username });
      registeredUser = await User.register(newUser, password);

      const otp = generateOtp();
      await Otp.create({ email, otp, purpose: "signup" });
      await sendOtpEmail(email, otp, "signup");

      req.flash("success", "We've sent a verification code to your email.");
      return req.session.save(() =>
        res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`),
      );
    } catch (e) {
      // If the account was created but something failed afterward
      // (e.g. sending the OTP email), roll it back so the
      // username/email aren't stuck as "already registered".
      if (registeredUser) {
        await User.deleteOne({ _id: registeredUser._id });
        await Otp.deleteMany({
          email: registeredUser.email,
          purpose: "signup",
        });
      }
      req.flash("error", e.message);
      return req.session.save(() => res.redirect("/signup"));
    }
  }),
);

// Show OTP verification page (used right after signup)
router.get("/verify-otp", (req, res) => {
  const { email } = req.query;
  if (!email) {
    req.flash("error", "Missing email for verification.");
    return res.redirect("/signup");
  }
  res.render("users/verify-otp.ejs", { email });
});

router.post(
  "/verify-otp",
  wrapAsync(async (req, res) => {
    const { email, otp } = req.body;

    const otpDoc = await Otp.findOne({ email, otp, purpose: "signup" });
    if (!otpDoc) {
      req.flash(
        "error",
        "That code is invalid or has expired. Please try again.",
      );
      return req.session.save(() =>
        res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`),
      );
    }

    await User.updateOne({ email }, { isVerified: true });
    await Otp.deleteMany({ email, purpose: "signup" });

    req.flash("success", "Email verified! You can now log in.");
    return req.session.save(() => res.redirect("/login"));
  }),
);

// Resend a verification code — works for both signup and password-reset flows
router.get(
  "/resend-otp",
  wrapAsync(async (req, res) => {
    const { email, purpose } = req.query;
    const validPurpose = purpose === "reset" ? "reset" : "signup";
    const fallbackPage =
      validPurpose === "reset" ? "/forgot-password" : "/signup";

    if (!email) {
      req.flash("error", "Missing email.");
      return req.session.save(() => res.redirect(fallbackPage));
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "No account found for that email.");
      return req.session.save(() => res.redirect(fallbackPage));
    }

    // Only the signup flow cares about isVerified — a reset request should
    // always be allowed to resend, regardless of verification status.
    if (validPurpose === "signup" && user.isVerified) {
      req.flash("success", "This account is already verified — please log in.");
      return req.session.save(() => res.redirect("/login"));
    }

    await Otp.deleteMany({ email, purpose: validPurpose });
    const otp = generateOtp();
    await Otp.create({ email, otp, purpose: validPurpose });

    try {
      await sendOtpEmail(email, otp, validPurpose);
      req.flash("success", "A new code has been sent to your email.");
    } catch (e) {
      console.log("Failed to send OTP email:", e.message);
      req.flash(
        "error",
        "We couldn't send the email right now. Please try again in a moment.",
      );
    }

    const redirectPage =
      validPurpose === "reset" ? "/reset-password" : "/verify-otp";
    return req.session.save(() =>
      res.redirect(`${redirectPage}?email=${encodeURIComponent(email)}`),
    );
  }),
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash(
        "error",
        info && info.message ? info.message : "Incorrect username or password.",
      );
      return req.session.save(() => res.redirect("/login"));
    }

    req.logIn(
      user,
      wrapAsync(async (err) => {
        if (err) {
          return next(err);
        }

        if (!user.isVerified) {
          const email = user.email;
          req.logout((err) => {
            if (err) return console.log(err);
          });

          // Send a fresh OTP right now, since any earlier signup OTP may
          // have expired or never arrived.
          await Otp.deleteMany({ email, purpose: "signup" });
          const otp = generateOtp();
          await Otp.create({ email, otp, purpose: "signup" });

          try {
            await sendOtpEmail(email, otp, "signup");
            req.flash(
              "error",
              "Please verify your email before logging in. We've sent a new code.",
            );
          } catch (e) {
            console.log("Failed to send OTP email:", e.message);
            req.flash(
              "error",
              "Please verify your email before logging in. We couldn't send a new code right now — use the resend link on the next page.",
            );
          }

          return req.session.save(() =>
            res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`),
          );
        }

        req.flash("success", "Welcome back to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        return req.session.save(() => res.redirect(redirectUrl));
      }),
    );
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are successfully logged out");
    return req.session.save(() => res.redirect("/listings"));
  });
});

// Forgot password — request an OTP
router.get("/forgot-password", (req, res) => {
  res.render("users/forgot-password.ejs");
});

router.post(
  "/forgot-password",
  wrapAsync(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      await Otp.deleteMany({ email, purpose: "reset" });
      const otp = generateOtp();
      await Otp.create({ email, otp, purpose: "reset" });
      try {
        await sendOtpEmail(email, otp, "reset");
      } catch (e) {
        console.log("Failed to send OTP email:", e.message);
      }
    }

    // Same message whether or not the account exists, so we don't reveal
    // which emails are registered.
    req.flash(
      "success",
      "If that email is registered, a reset code has been sent.",
    );
    return req.session.save(() =>
      res.redirect(`/reset-password?email=${encodeURIComponent(email)}`),
    );
  }),
);

router.get("/reset-password", (req, res) => {
  const { email } = req.query;
  if (!email) {
    req.flash("error", "Missing email.");
    return res.redirect("/forgot-password");
  }
  res.render("users/reset-password.ejs", { email });
});

router.post(
  "/reset-password",
  wrapAsync(async (req, res) => {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      req.flash("error", "Passwords do not match.");
      return req.session.save(() =>
        res.redirect(`/reset-password?email=${encodeURIComponent(email)}`),
      );
    }

    const otpDoc = await Otp.findOne({ email, otp, purpose: "reset" });
    if (!otpDoc) {
      req.flash(
        "error",
        "That code is invalid or has expired. Please try again.",
      );
      return req.session.save(() =>
        res.redirect(`/reset-password?email=${encodeURIComponent(email)}`),
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "No account found for that email.");
      return req.session.save(() => res.redirect("/forgot-password"));
    }

    await new Promise((resolve, reject) => {
      user.setPassword(newPassword, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
    await user.save();
    await Otp.deleteMany({ email, purpose: "reset" });

    req.flash("success", "Password reset successfully! Please log in.");
    return req.session.save(() => res.redirect("/login"));
  }),
);

// Change password — for a logged-in user, verifying their current password
router.get("/change-password", isLoggedIn, (req, res) => {
  res.render("users/change-password.ejs");
});

router.post(
  "/change-password",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      req.flash("error", "New passwords do not match.");
      return req.session.save(() => res.redirect("/change-password"));
    }

    await new Promise((resolve, reject) => {
      req.user.changePassword(currentPassword, newPassword, (err) => {
        if (err) return reject(err);
        resolve();
      });
    }).catch((err) => {
      throw new ExpressError(400, "Current password is incorrect.");
    });

    req.flash("success", "Password changed successfully!");
    return req.session.save(() => res.redirect("/listings"));
  }),
);

// Profile — view and update profile picture
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("users/profile.ejs");
});

router.post(
  "/profile",
  isLoggedIn,
  upload.single("avatar"),
  wrapAsync(async (req, res) => {
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      await User.findByIdAndUpdate(req.user._id, { avatar: { url, filename } });
    }
    req.flash("success", "Profile picture updated!");
    return req.session.save(() => res.redirect("/profile"));
  }),
);

module.exports = router;
