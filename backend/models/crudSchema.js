const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
   phone:String,
    age:Number,
    Description:String
   
});
module.exports= mongoose.model("crud",userSchema)