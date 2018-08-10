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
      cheerio = require('cheerio'),
      request = require('request'),
      mongodb = require("mongojs"),
      mongoose = require("mongoose"),
      routes = require("./routes"),
      db = require("./models"),
      axios = require("axios")
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
app.use((req, res, next) => {
  console.log('req.session:', req.session);
  return next();
}); // Used to display the current session info, debugging purposes only!

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

request("https://www.eventbrite.com/d/NC--Charlotte/science-and-tech--events/technology-recruiting/?page=1", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // With cheerio, find each p-tag with the "title" class
  // (i: iterator. element: the current element)
  $("div").each(function(i, element) {

    // Save the text of the element in a "title" variable
    let title = $(element);

    // In the currently selected element, look at its child elements (i.e., its a-tags),
    // then save the values for any "href" attributes that the child elements may have
    // var link = $(element).children().attr("href");

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title[0],
      // link: link
    });
    
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
