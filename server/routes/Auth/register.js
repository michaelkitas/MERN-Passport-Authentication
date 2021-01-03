const express = require("express");
const register = express.Router();

//Passport file for login/register
const passport = require("../../Auth");

//Register passport authentication
register.post("/register", (req, res) => {
  passport.authenticate("local-register", function (error, user, info) {
    if (error) {
      return res.status(500).json({
        message: error || "Something happend",
        error: error.message || "Server error",
      });
    }
    req.logIn(user, function (error, data) {
      if (error) {
        return res.status(500).json({
          message: error || "Something happend",
          error: error.message || "Server error",
        });
      }
      return res.json(user);
    });
  })(req, res);
});

module.exports = register;
