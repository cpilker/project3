const express = require("express"),
      bodyParser = require("body-parser"),
      path = require('path'),
      crypto = require('crypto'),
      multer = require('multer'),
      GridFsStorage = require('multer-gridfs-storage'),
      Grid = require('gridfs-stream'),
      methodOverride = require('method-override'),
      http = require('http'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      cookieParser = require('cookie-parser'),
      session  = require('express-session'),
      mongodb = require("mongojs"),
      mongoose = require("mongoose"),
      routes = require("./routes"),
      db = require("./models"),
      app = express(),
      PORT = process.env.PORT || 3000;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
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