const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");
const cookieParser = require('cookie-parser')


exports.register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if (password.length < 5) throw "Password must be atleast 6 characters long.";

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "User with same email already exits.";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
    phone,
    role
  });

  await user.save();

  res.json({
    message: "User [" + name + "] registered successfully!",
    user
    
  });
  //res.send(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw "Email and Password did not match.";

  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  console.log(user.id)
  res.cookie('auth',token);

  res.json({
    message: `${user.id} logged in succesfully`,
    token,
  });

  
};
