/**
 * index.js is always as root js file
 * node js runtime only accept common js module
 * import express from 'express' is from another module ES2015
 */
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
//notice the order
require("./services/passport");


mongoose.connect(keys.mongooseURI, { useUnifiedTopology: true });
/**
 * because ./services/passport don't have export don't return anything
 * no need to use const = passportConfig
 */


//app
const app = express();

//route handlers
//just like api in spring boot
app.get("/", (req, res) => {
    res.send({
        hi: "Jianlang"
    });
});

app.get("/Hi", (req, res) => {
    res.send("Hi, Jianlang");
});

//ask passport to deal with cookie
app.use(
    cookieSession({
        maxAge: 1 * 24 * 60 * 60 * 1,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);


//underlying runtime inject env variable
//In production || by default uses 5000 port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
