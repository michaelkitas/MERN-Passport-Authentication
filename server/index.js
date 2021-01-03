const express = require("express");
const app = express();

const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("./Auth");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
require("dotenv").config();

//Connect with our db
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    resave: false,
    saveUninitialized: false, 
    secret: process.env.mongoDB_secret,
    store: new MongoStore({ 
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const Authentication = require("./routes/Auth");
const User = require("./routes/User");

//Using routers
app.use("/auth", Authentication);
app.use("/user", User);

//Define port for server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
