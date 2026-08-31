const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["signup", "reset"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // documents auto-delete 10 minutes (600s) after creation
  },
});

module.exports = mongoose.model("Otp", otpSchema);
