const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

async function sendOtpEmail(toEmail, otp, purpose) {
  const subject =
    purpose === "signup"
      ? "Verify your Wanderlust account"
      : "Reset your Wanderlust password";

  const heading =
    purpose === "signup" ? "Confirm your email" : "Reset your password";

  const bodyText =
    purpose === "signup"
      ? "Use the code below to verify your email and activate your Wanderlust account."
      : "Use the code below to reset your Wanderlust password.";

  await transporter.sendMail({
    from: `"Wanderlust" <${process.env.BREVO_SENDER_EMAIL}>`,
    to: toEmail,
    subject,
    html: `
            <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
                <h2>${heading}</h2>
                <p>${bodyText}</p>
                <p style="font-size: 32px; font-weight: bold; letter-spacing: 6px; margin: 24px 0;">${otp}</p>
                <p style="color: #6c757d;">This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
            </div>
        `,
  });
}

module.exports = { generateOtp, sendOtpEmail };
