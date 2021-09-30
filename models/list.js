const mongoose = require("mongoose");

var mongoosePaginate = require('mongoose-paginate');

const listSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "what is your name bro!!!"],
      ref:"User",
    },
    
    title: {
      type: String,
      required: [true, "title? keep it new"],
      trim:true,
      unique: true,
      maxlength: 15,
      
    },
    description: {
      type: String,
      required: [true, "description is required!!!"],
      trim: true,
      maxlength:100
    },
    track: {
        type: Boolean,
        default: false,
    }, 

    category: {
      type: String,
      enum:["work", "hobby","task"],
      default: "task",
      required:[true, "please select work, hobby or task specifically"]
    },
    likes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    }],
    rating:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Rating"
    }]
  },
  {
    timestamps: true,
  }

);
listSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("List", listSchema);
