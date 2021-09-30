const mongoose = require("mongoose");

const User = mongoose.model("User");


module.exports = async (req, res, next) => {
    try {
        id = req.query.id;
        let user =  await User.findById(id);
        console.log(id)
        console.log(user)
        if(user.role=="admin"){
            next();
        }else{
            res.json("only admin access")
        }} catch (err) {
          console.log(err)
          
      res.status(401).json({
        message: "Forbidden 🚫🚫",
        err
      });
    }
  };