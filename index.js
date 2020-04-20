/**
 * index.js is always as root js file
 * node js runtime only accept common js module
 * import express from 'express' is from another module ES2015
 */
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/user");
//notice the order
require("./services/passport");


mongoose.connect(keys.mongooseURI, { useUnifiedTopology: true });
/**
 * because ./services/passport don't have export don't return anything
 * no need to use const = passportConfig
 */


//app
const app = express();

//add middleware
//ask passport to deal with cookie
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 1 * 24 * 60 * 60 * 1,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/paymentRoutes")(app);

//109
if (process.env.NODE_ENV === "production"){
    //serve up production assets
    app.use(express.static("client/build"));

    //serve up the index.html if it doesn't recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", 'build', "index.html"));
    });
}

//underlying runtime inject env variable
//In production || by default uses 5000 port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
