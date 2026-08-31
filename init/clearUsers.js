if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const User = require("../models/user.js");
const Otp = require("../models/otp.js");

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
  console.log("connected to DB");

  const userResult = await User.deleteMany({});
  const otpResult = await Otp.deleteMany({});

  console.log(`Deleted ${userResult.deletedCount} user(s)`);
  console.log(`Deleted ${otpResult.deletedCount} OTP record(s)`);

  mongoose.connection.close();
}

main().catch((err) => {
  console.log(err);
});
