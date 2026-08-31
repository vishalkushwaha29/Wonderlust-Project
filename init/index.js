if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});

  // Assign every seeded listing to the first user found in your DB
  // (e.g. the account you signed up with), so you can edit/delete them.
  const existingUser = await User.findOne({});
  if (!existingUser) {
    console.log(
      "No users found in the DB yet — sign up for an account first, then re-run this script so listings have a valid owner.",
    );
    process.exit(1);
  }

  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: existingUser._id,
  }));
  await Listing.insertMany(dataWithOwner);
  console.log(
    `${dataWithOwner.length} listings were initialized, owned by ${existingUser.username}`,
  );
  mongoose.connection.close();
};
