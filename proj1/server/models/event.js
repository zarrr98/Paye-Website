const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
      _id: mongoose.Schema.Types.ObjectId,
      title : String,
      owner : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      capacity : Number,
      start_date : String,
      picture : {type: String , default : "server\\eventpics\\2020-09-29T20-07-55.706Znopic.jpg"},
      public : {type : Boolean , default : true},
      applicants : [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

    },
    { strict: false }
  );
  
  module.exports = mongoose.model("Event", eventSchema, "Events");