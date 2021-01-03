const express = require("express");
const User = express.Router();

const getDetails = require("./getDetails");

User.use("", getDetails);

module.exports = User;
