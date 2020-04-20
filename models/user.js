const mogoose = require("mongoose");
//const Schema = mogoose.Schema;
//mogoose is a object with a propriety called Schema
const { Schema } = mogoose;

//define propriety in every record
const userSchema = new Schema({
    googleId: String,
    credits: { type: Number, default: 0 }
})

//create a class == create a collection
mogoose.model("users", userSchema);
