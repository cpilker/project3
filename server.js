
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
  PORT = process.env.PORT || 3000,
  User = require('./models/user'),
  path = require('path'),
  Recruiter = require('./models/recruiter');

  mongoose.connect(process.env.MONGODB_URI || process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || "mongodb://recruithound-username:recruithoundpassword1@ds229552.mlab.com:29552/recruithound-db");
// Connect to the Mongo DB
let conn = mongoose.connection
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
app.use((req, res, next) => {
  // Used to display the current session info, debugging purposes only!
  // console.log('req.session:', req.session);
  return next();
});


  // Passport middleware
passport.use('user', new LocalStrategy(User.authenticate()));
passport.use('recruiter', new LocalStrategy(Recruiter.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// If not Heroku Serve up static assets 
app.use('/images', express.static("client/public/images"));
  // if on Heroku use this
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, './client/build')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname + './client/build/index.html'))
	})
}


// Init GridFs variable
let gfs;

// Test connection
conn.on('error', function (err) {
  console.log('Database Error: '+ err)
});

// Make connection to the database
conn.once('open', function () {
  console.log('Mongo Connection Success!')
  // Init our stream
  gfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  // Routes
  require('./routes/user')(app, gfs)
  require('./routes/recruiter')(app, gfs)
})


// Start server
app.listen(PORT, () => console.log(`http://localhost: ${PORT}!`));




// TO-DO:
// 1) move routes to correct folders. (DONE)
// 2) move server connection to relative file/ remove from other files
// 3) line 110-ish with "res.redirect('/user-dashboard')" needs to be corrected so that it doesn't refresh whole page
// 4) remove console logs (DONE)
// 5) uninstall unused npm's
//
//
//
//
//
// testing