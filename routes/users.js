var express = require('express');
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/passpot')
.then(()=>{
  console.log("mongodb cunnect");
})
const userSchema = new mongoose.Schema({
  username:String,
  email:String,
  discription:String,
  password:String
})

userSchema.plugin(plm)
module.exports = mongoose.model("user",userSchema);
