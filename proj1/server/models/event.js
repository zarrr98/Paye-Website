const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      owner : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      capacity : Number,
      start_date : String,
      picture : String,
      public : {type : Boolean , default : true},
      applicants : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

    },
    { strict: false }
  );
  
  module.exports = mongoose.model("Event", eventSchema, "Events");