const passport = require('passport');
const User = require('../../models/user');
const Recruiter = require('../../models/recruiter')
mongoose = require('mongoose')
mongojs = require('mongojs');
multer = require('multer');
crypto = require('crypto');
GridFsStorage = require('multer-gridfs-storage');
// let conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/main")


module.exports = function(app) {

  // Database configuration
  var databaseUrl = "main";
  var collections = ["recruiters"];

  // Hook mongojs configuration to the db variable
  var db = mongojs(databaseUrl, collections);
  db.on("error", function(error) {
    console.log("Database Error:", error);
  });

  const storage = new GridFsStorage({
    url: 'mongodb://localhost/main',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = req.body.username[0];
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            aliases: ['testing123']
          };
          console.log(fileInfo)
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({ storage });
  
  app.post('/api/signup', upload.single('file'), (req, res) => {
    // res.json({file: req.file})
    // res.redirect('/user-dashboard')

    console.log("Signup post incoming...");
    console.log(req.body);
    console.log(req.body.username[0]);
    
    User.register(new User(
      { 
        username: req.body.username[0],
        firstname: req.body.newfirstname[0],
        lastname: req.body.newlastname[0],
        address1: req.body.newaddress1[0],
        address2: req.body.newaddress2[0],
        city: req.body.newcity[0],
        state: req.body.newstate[0],
        zip: req.body.newzip[0],
        password: req.body.password[0]
      }), req.body.password[0], function(err, account) {
      if (err) {
        console.log("error found in passport-routes.js!");
          console.log(err);
          res.json({err});
      } else {
          console.log('New user added!');



          passport.authenticate('local')(req, res, function() {
            console.log(req.user);
            console.log('Done!');
            res.json({username: req.user.username});
          });
        }
      });
    }
  );

  app.get('/recruitersearch', function(req, res){
    // console.log(req.query)
    // console.log("recruiter city")
    db.collection("recruiters").find({city1: req.query.city}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log(response);
        res.send({response})
      }
    });
  })

  app.get('/usersearch', function(req, res){
    // console.log(req.query)
    // console.log("recruiter city")
    db.collection("users").find({city: req.query.city}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log(response);
        res.send({response})
      }
    });
  })

  app.post('/api/signin', function(req, res, next) {
    console.log("Signin post incoming...");
    console.log(req.body);
    next();
  },
    passport.authenticate('local'),(req, res) => {
      console.log('logged in: ', req.user);
      res.json({username: req.user.username});
    }
  )
     
  app.get('/user-dashboard', isLoggedIn, function(req, res) {
    res.json({username: req.body.username});
  });


  function isLoggedIn(req, res, next) {
    if (req.user) 
      return next();
    res.redirect('/');
  }

}