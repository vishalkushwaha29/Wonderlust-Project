const rateLimit = require("express-rate-limit");

// Applies to login attempts — blocks brute-force password guessing.
module.exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many login attempts. Please try again in 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash(
      "error",
      "Too many login attempts. Please try again in 15 minutes.",
    );
    res.redirect("/login");
  },
});

// Applies to signup — slows down mass fake-account creation.
module.exports.signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash(
      "error",
      "Too many signup attempts from this device. Please try again later.",
    );
    res.redirect("/signup");
  },
});

// Applies to OTP verify/resend and password-reset requests — a 6-digit
// OTP is guessable within ~10,000 tries, so this must be tightly capped.
module.exports.otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash(
      "error",
      "Too many attempts. Please wait a few minutes and try again.",
    );
    res.redirect("/login");
  },
});
