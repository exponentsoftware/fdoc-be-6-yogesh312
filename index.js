const mongoose= require('mongoose')
require("dotenv").config();


mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
  
mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection ERROR: " + err.message);
});
  
mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
});
//Bring in the models
require("./models/List");
require("./models/User");
require("./models/Rating");


const app = require("./app");

const server = app.listen(8000, () => {
  console.log("Server listening on port 8000");
});




const jwt = require("jwt-then");

//const Message = mongoose.model("Message");
const User = mongoose.model("User");
const List = mongoose.model("List");
const Rating = mongoose.model("Rating");

