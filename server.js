
const 
  express = require("express"),
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
// app.use(routes);

// passport config
const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use((req, res, next) => {
  console.log('req.session:', req.session);
  return next();
}); // Used to display the current session info, debugging purposes only!
passport.deserializeUser(User.deserializeUser());

require('./routes/api/passport-routes')(app);



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

// Create storage engine 
const storage = new GridFsStorage({
  url: 'mongodb://localhost/main',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        console.log('file name is this: ////////// ' + filename)
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: ''
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


// @route POST /upload
// @desc Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({file: req.file})
  res.redirect('/user-dashboard')
})


// @route GET /files/:filename
// @desc Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exist"
      })
    }
    // Files exist
    return res.json(file);
  })
})

// @route GET /files/:filename
// @desc Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if file
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      })
    }
    // Files exist
    return res.json(files);
  })
})

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exist"
      });
    }
    // Check if image
    if (file.contentType === 'image/jpeg' 
    || file.contentType === 'img/png') {
      // Read output to browser 
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      })
    }
  })
})

// Start the API server

app.listen(PORT, () => console.log(`http://localhost: ${PORT}!`));
