const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    url: {
      type: String,
      default: "",
    },
    filename: String,
  },
});

userSchema.virtual("avatarUrl").get(function () {
  if (this.avatar && this.avatar.url) {
    return this.avatar.url;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.username)}&background=fe424d&color=fff`;
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
