const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
app.use('/images', express.static("client/public/images"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// var databaseUrl = "main";
// var db = mongojs(databaseUrl);



// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/main");
//process.env.MONGODB_URI
mongoose.Promise = Promise;

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Start the API server
app.listen(PORT, function() {
  console.log(`http://localhost: ${PORT}!`);
});