//index.js is always as root js file

//node js runtime only accept common js module
//import express from 'express' is from another module ES2015
const express = require("express");

//app
const app = express();

//route handlers
//just like api in spring boot
app.get("/", (req, res) => {
    res.send({
        hi: "there"
    });
});

app.get("/Hi", (req, res) => {
    res.send("Hi, Jianlang");
});

//underlying runtime inject env variable
//In production || by default uses 5000 port
const PORT = process.env.PORT || 5000;
app.listen(PORT);