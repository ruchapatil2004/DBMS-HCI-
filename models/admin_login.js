const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/FacultyProject", {useNewUrlParser:true}).then(()=>{
    console.log("mongo connected");
})
.catch(()=>{
    console.log("Failed to connect");
})

const adminloginSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})
adminloginSchema.plugin(passportLocalMongoose);

const Database= new mongoose.model("Login",adminloginSchema);

module.exports=(Database);