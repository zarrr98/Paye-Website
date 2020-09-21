const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      name : {type : String , required : true},
      familyName :  {type : String , required : true},
      password :  {type : String , required : true},
      email :  {type : String , required : true, unique : true},
      confirmed :  {type : Boolean , default : false},

    },
    { strict: false }
  );
  
  module.exports = mongoose.model("User", userSchema, "Users");