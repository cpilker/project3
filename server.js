const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const http = require('http');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const mongodb = require("mongojs");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'random phrase',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
app.use('/images', express.static("client/public/images"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client"));
}

// Add routes, both API and view
// app.use(routes);


// passport config
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./routes/api/passport-routes')(app);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/main");
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