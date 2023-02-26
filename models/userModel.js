const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = { User };
