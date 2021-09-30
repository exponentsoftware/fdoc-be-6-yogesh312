const express = require("express");
const cookieParser = require('cookie-parser')


const app = express();

app.use(cookieParser())

//include express layouts
const expressLayouts = require('express-ejs-layouts');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());

//set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');



// //use express layouts
// app.use(expressLayouts);

// //extract styles and scripts from subpages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

//Bring in the routes
app.use("/list", require("./routes/list"));
app.use("/user", require("./routes/user"));


//Setup Error Handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
