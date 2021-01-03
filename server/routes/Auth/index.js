const express = require("express");
const Authentication = express.Router();

const Login = require("./login");
const Register = require("./register");

Authentication.use("", Login, Register);

module.exports = Authentication;
