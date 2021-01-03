const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: String,

    email: String,
    password: String,
    first_name: String,
    last_name: String,
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
