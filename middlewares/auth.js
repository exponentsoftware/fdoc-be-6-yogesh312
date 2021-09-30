const jwt = require("jwt-then");

const cookieParser = require('cookie-parser')

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    // if (!req.cookies.auth) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.cookies.auth
    const payload = await jwt.verify(token, process.env.SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
    console.log(err)
  }
};
