const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Otp = require("../models/otp.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const { generateOtp, sendOtpEmail } = require("../utils/sendEmail.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let registeredUser;
    try {
      let { username, email, password } = req.body;

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
      res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (e) {
      if (registeredUser) {
        await User.deleteOne({ _id: registeredUser._id });
        await Otp.deleteMany({
          email: registeredUser.email,
          purpose: "signup",
        });
      }
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }),
);

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
      return res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
    }

    await User.updateOne({ email }, { isVerified: true });
    await Otp.deleteMany({ email, purpose: "signup" });

    req.flash("success", "Email verified! You can now log in.");
    res.redirect("/login");
  }),
);

router.get(
  "/resend-otp",
  wrapAsync(async (req, res) => {
    const { email, purpose } = req.query;
    const validPurpose = purpose === "reset" ? "reset" : "signup";
    const fallbackPage =
      validPurpose === "reset" ? "/forgot-password" : "/signup";

    if (!email) {
      req.flash("error", "Missing email.");
      return res.redirect(fallbackPage);
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "No account found for that email.");
      return res.redirect(fallbackPage);
    }

    if (validPurpose === "signup" && user.isVerified) {
      req.flash("success", "This account is already verified — please log in.");
      return res.redirect("/login");
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
    res.redirect(`${redirectPage}?email=${encodeURIComponent(email)}`);
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
      return res.redirect("/login");
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

          return res.redirect(`/verify-otp?email=${encodeURIComponent(email)}`);
        }

        req.flash("success", "Welcome back to Wanderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
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
    res.redirect("/listings");
  });
});

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

    req.flash(
      "success",
      "If that email is registered, a reset code has been sent.",
    );
    res.redirect(`/reset-password?email=${encodeURIComponent(email)}`);
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
      return res.redirect(`/reset-password?email=${encodeURIComponent(email)}`);
    }

    const otpDoc = await Otp.findOne({ email, otp, purpose: "reset" });
    if (!otpDoc) {
      req.flash(
        "error",
        "That code is invalid or has expired. Please try again.",
      );
      return res.redirect(`/reset-password?email=${encodeURIComponent(email)}`);
    }

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "No account found for that email.");
      return res.redirect("/forgot-password");
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
    res.redirect("/login");
  }),
);

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
      return res.redirect("/change-password");
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
    res.redirect("/listings");
  }),
);

module.exports = router;
