
// Dependencies 
const 
  express = require("express"),
  bodyParser = require("body-parser"),
  Grid = require('gridfs-stream'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  cookieParser = require('cookie-parser'),
  session  = require('express-session'),
  mongoose = require("mongoose"),
  routes = require("./routes"),
  app = express(),
  MongoStore = require('connect-mongo')(session),
  PORT = process.env.PORT || 3000;

// Connect to the Mongo DB
let conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/main");
mongoose.Promise = Promise;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'random phrase', // session secret
  resave: false,
  cookie: {maxAge: 8*60*60*1000 },
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: conn })
}));


// Serve up static assets (usually on heroku)
app.use('/images', express.static("client/public/images"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client"));
}

// Add routes, both API and view
app.use(routes);

// passport config
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use((req, res, next) => {
  console.log('req.session:', req.session);
  return next();
}); // Used to display the current session info, debugging purposes only!
passport.deserializeUser(User.deserializeUser());


let gfs;

//test connection
conn.on('error', function (err) {
    console.log('Database Error: '+ err)
});

conn.once('open', function () {
    console.log('Mongo Connection Success!')

    //Init our stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

// Start the API server

app.listen(PORT, () => console.log(`http://localhost: ${PORT}!`));


// TO-DO:
// 1) move routes to correct folders.
// 2) move server connection to relative file/ remove from other files
// 3) line 110-ish with "res.redirect('/user-dashboard')" needs to be corrected so that it doesn't refresh whole page
// 4) remove console logs
// 5) uninstall unused npm's
//
//
//
//
//
