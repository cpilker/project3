// Requiring our dependencies 
const
  passport = require('passport'),
  User = require('../../models/user'),
  Recruiter = require('../../models/recruiter'),
  mongoose = require('mongoose'),
  mongojs = require('mongojs'),
  path = require('path'),
  multer = require('multer'),
  crypto = require('crypto'),
  GridFsStorage = require('multer-gridfs-storage'),
  db = require("../models")
  email 	= require("emailjs")
  server 	= email.server.connect({
    user: 'hello@ryanadiaz.com',
    password: 'testpassword',
    host: 'mail.ryanadiaz.com',
    port: 587,
    tls:  false
  });


// Create storage engine 
const storage = new GridFsStorage({
  url: 'mongodb://localhost/main',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      console.log(req.body)
      const fileInfo = {
        filename: req.body.file[0],
        bucketName: 'uploads',
        metadata: [req.body.file[1]]
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({ storage });



module.exports = function(app) {

  // @route POST /upload
  // @desc Uploads file to DB
  app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/user-dashboard')
  })
 
  // @route DELETE /files/:id
  // @desc  Delete file
  app.delete('/files/:id', (req, res) => {
    console.log('MATT TEST')
    console.log(req.params)
    gfs.remove({filename: req.params.id, root: 'uploads'}, (err, gridStore) => {
      if (err) {
        return res.status(404).json({err: err})
      } 
      res.redirect('/user-dashboard')
    })
  })



  // GET route for display all
  app.get("/api/getuser", (req, res, next) => {
    console.log("Retreving current user");
    console.log(req);
  });
 
  app.post("/api/sendmail", function(req, res) {
    console.log("Sendmail has been fired!");
    console.log(req.body);
    
    server.send({
      text:     req.body.message, 
      from:     req.body.email, 
      to:       "Ryan Diaz <ryandiaz@gmail.com>",
      cc:       "Chad Pilker <chad.pilker@gmail.com>, jjmckenzie@carolina.rr.com, matthewgeddes@yahoo.com",     
      subject:  "RecruitHound Contact - Job Seeker",
      attachment:
      [
        {data: '<html>Name: ' + req.body.person_name + '<br />Phone:  ' + req.body.number1 + '<br />Message: ' + req.body.message + '</html>', alternative:true}
      ]
    }, function(err, message) {
        console.log(err || message); 
        if (!err) {   // Sends back status message in the form of an object -> res.status
          res.json({status: "success"});
        } else {
          res.json({status: "error"});
        }
    });
  });

  app.post('/api/signup', (req, res) => {
    console.log("Signup post incoming...");
    console.log(req.body);
   
    User.register(new User(
      { 
        username: req.body.username,
        firstname: req.body.newfirstname,
        lastname: req.body.newlastname,
        address1: req.body.newaddress1,
        address2: req.body.newaddress2,
        city: req.body.newcity,
        state: req.body.newstate,
        zip: req.body.newzip,
        password: req.body.password
      }), req.body.password, function(err, account) {
      if (err) {
        console.log("error found in passport-routes.js!");
          console.log(err);
          res.json({err});
      } else {
          console.log('New user added!');
          console.log(req)
          passport.authenticate('local')(req, res, function() {
            console.log(req.user);
            console.log('Done!');
            res.json({username: req.user.username});
          });
        }
      });
    }
  );

  app.post('/api/saveprofile', (req, res) => {
    console.log("saveprofile post incoming...");
    console.log(req.body);
    User.update({_id: mongojs.ObjectID(req.body.id)}, {$set: {   // First update the user profile
      username: req.body.newusername,
      firstname: req.body.newfirstname,
      lastname: req.body.newlastname,
      address1: req.body.newaddress1,
      address2: req.body.newaddress2,
      city: req.body.newcity,
      state: req.body.newstate,
      zip: req.body.newzip,
    }}, 
    function(error, result) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(result);
        User.findOne({_id: mongojs.ObjectID(req.body.id)}, function(error, user) {
          if (req.body.newpassword != null) {   // Second update the password if necessary
            user.setPassword(req.body.newpassword, function(err) {
              if (err) {
                console.log(err);
              } else {
                user.save(function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("User updated!")
                  }
                })
              }
            })
          }
          req.login(user, function(err) {   // Third refresh the session with new email address if changed
            if (err) return next(err)
            console.log(req.session)
            console.log('User: ')
            console.log(user)
            res.send({
              id:user._id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              address1: user.address1,
              address2: user.address2,
              city: user.city,
              state: user.state,
              zip: user.zip,
              created: user.created,
              lastLogin: user.lastLogin
            })
          })

        })
      }
    });    
  })


  //Search for all recruiters by a given city
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

  


  app.post('/api/signin', function(req, res, next) {
    console.log("Signin post incoming...");
    console.log(req.body);
    next();
  },
    passport.authenticate('local'),(req, res) => {
      console.log('logged in: ', req.user);
      res.json({
        id:req.user._id,
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        address1: req.user.address1,
        address2: req.user.address2,
        city: req.user.city,
        state: req.user.state,
        zip: req.user.zip,
        created: req.user.created,
        lastLogin: req.user.lastLogin
      });
    }
  )
     
  app.get('/api/getuser', function(req, res) {
    console.log('getuser get has fired')
    console.log(req.session.passport.user)
    db.collection("users").find({username: req.session.passport.user}, function(error, response) {
      if (error) {
        console.log('Error: ', error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log(response[0]);
        res.send({
          id: response[0]._id,
          username: response[0].username,
          firstname: response[0].firstname,
          lastname: response[0].lastname,
          address1: response[0].address1,
          address2: response[0].address2,
          city: response[0].city,
          state: response[0].state,
          zip: response[0].zip,
          created: response[0].created,
          lastLogin: response[0].lastLogin
        })
      }
    });
  });



};
