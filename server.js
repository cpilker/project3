const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("mongojs");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
app.use('/images', express.static("client/public/images"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/main");
//process.env.MONGODB_URI
mongoose.Promise = Promise;


let connection = mongoose.connection;
//test connection
connection.on('error', function (err) {
    console.log('Database Error: '+err)
});

connection.once('open', function () {
    console.log('Mongo Connection Success!')
})



// Start the API server
app.listen(PORT, function() {
  console.log(`http://localhost: ${PORT}!`);
});