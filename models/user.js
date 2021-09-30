const mongoose = require("mongoose");
require("mongoose-type-email")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "what is your name bro!!!"],
      trim:true,
      maxlength: 15,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, "email is invalid, try again"],
      unique:true,
    },
    password: {
        type: String,
        required: "Password is required!",
    },
    phone: {
      type: Number,
      required: [true, "phone number  is required!!!"],
      trim: true,
      maxlength:[10,"phone number should be 10 digits"],
      minlength:[10,"phone number should be 10 digits"],
      unique:[true,"phone number exist"]
    },
    role: {
      type: String,
      enum:["admin","user"],
      default: "user",
      //required:[true, "please select work, hobby or task specifically"]
    }
  },
  {
    timestamps: true,
  }

);
module.exports = mongoose.model("User", userSchema);
