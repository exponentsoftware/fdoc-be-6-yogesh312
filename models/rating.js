const mongoose = require("mongoose");

var mongoosePaginate = require('mongoose-paginate');

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"User",
    },
    listId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"List",
        required:true
    },
    Comment: {
      type: String,
      maxlength:100
    },
    rate: {
        type: Number,
        maxlength: 5,
    },
  },
  {
    timestamps: true,
  }

);
module.exports = mongoose.model("Rating", ratingSchema);
