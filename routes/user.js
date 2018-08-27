// Requiring our dependencies 
const
  passport = require('passport'),
  User = require('../models/user'),
  Recruiter = require('../models/recruiter'),
  mongojs = require('mongojs'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  GridFsStorage = require('multer-gridfs-storage'),
  email 	= require("emailjs"),
  savedRecruiter = require("../models/savedRecruiter"),
  server 	= email.server.connect({
    user: 'recruithound@ryanadiaz.com',
    password: 'OIkMefNigidEsi8',
    host: 'mail.ryanadiaz.com',
    port: 587,
    tls:  false
  });

// Database configuration
const databaseUrl = process.env.MONGODB_URI || "mongodb://localhost/main";

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl);
db.on("error", function(error) {
    console.log("Database Error:", error);
});  

module.exports = function(app, gfs) {

  const database = mongojs(process.env.MONGODB_URI || "main");

  // Create storage engine for files/images
  let storage = new GridFsStorage({
    url: process.env.MONGODB_URI || "mongodb://localhost/main",
    file: (req, file) => {
      console.log(file)
      return new Promise((resolve, reject) => {
        console.log("new picture object fired")
        const fileInfo = {
          filename: file.originalname,
          bucketName: 'uploads',
          metadata: {filename: req.params.filename, purpose: req.params.purpose}
        };
        resolve(fileInfo);
      });
    }
  });

  const upload = multer({ storage }).single('file');


  /////////////// Upload image routes ///////////////

  // @route POST /upload
  // @desc Uploads file to DB
  app.post('/upload/:filename/:purpose', (req, res) => {
    console.log("1: new picture upload fired")
    // console.log(req.data)
    gfs.files.remove({metadata:{filename: req.params.filename, purpose: req.params.purpose}}, (err, GridFSBucke) => {
      if (err) {
        return res.status(404).json({err: err})
      } 
      // res.redirect('/user-dashboard')
      console.log('2: delete fired')
    })
    let storage = '';
    upload(req, res, function (err) {
      if (err) {
        return ("Multer err: " + err)
      }
      
      console.log("3: successful multer upload")
    }) 
    
    res.send('hello')
  })
 
  // @route DELETE /files/:id
  // @desc  Delete file
  app.delete('/files/:filename/:purpose', (req, res) => {
    // console.log("picture delete fired")
    gfs.files.remove({metadata:{filename: req.params.filename, purpose: req.params.purpose}}, (err, GridFSBucke) => {
      if (err) {
        return res.status(404).json({err: err})
      } 
      
      res.sendStatus()
    })
  })

  // @route GET /image/:filename
  // @desc Display Image
  app.get('/image/:filename/:purpose', (req, res) => {
  
    gfs.files.findOne({metadata:{filename: req.params.filename, purpose: req.params.purpose}}, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exist"
        });
      }
      // Check if imageasdfas
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

  // @route GET /image/:filename
  // @desc Download Image
  app.get('/download/:filename/:purpose', (req, res) => {
    // console.log('download fired')
    gfs.files.findOne({metadata: {filename: req.params.filename, purpose: req.params.purpose}}, function (err, file) {
      
      if (err) {
          return res.status(400).send(err);
      }
      else if (!file) {
          return res.status(404).send('Error on the database looking for the file.');
      }

      res.set('Content-Type', file.contentType);
      res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

      let readstream = gfs.createReadStream({
        filename: file.filename
      });

      readstream.on("error", function(err) { 
          res.end();
      });
      readstream.pipe(res);
    });
    
  })

  //////////////// Upload image routes //////////////




//////////////// User routes ////////////////
 
  app.post("/api/sendmail", function(req, res) {
    console.log("Sendmail has been fired!");
    
    server.send({
      text:     req.body.message, 
      from:     "recruithound@ryanadiaz.com", 
      to:       "RecruitHound <hello@recruithound.io>",
      // cc:       "Chad Pilker <chad.pilker@gmail.com>, jjmckenzie@carolina.rr.com, matthewgeddes@yahoo.com",     
      subject:  "RecruitHound Contact",
      attachment:
      [
        {data: '<html>Name: ' + req.body.person_name + '<br />Email: ' + req.body.email +  '<br />Phone:  ' + req.body.number1 + '<br />Message: ' + req.body.message + '</html>', alternative:true}
      ]
    }, function(err, message) {
        console.log(err || message); 
        if (!err) {   // Sends back status message in the form of an object -> res.status
          res.json({status: "success"});
        } else {
          res.json({status: err});
        }
    });
    
  });

  app.post('/api/signup', (req, res) => {
    // console.log("Signup post incoming...");
   
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
        password: req.body.password,
        jobSearchStatus: req.body.jobSearchStatus
      }), req.body.password, function(err, account) {
      if (err) {
        console.log("error found in passport-routes.js!");
          console.log(err);
          res.json({err});
      } else {
          console.log('New user added!');
          passport.authenticate('user')(req, res, function() {
            console.log('Done!');
            res.json({username: req.user.username});
          });
        }
      });

      
    }
    
  );

  

  // Update user profile
  app.post('/api/update-user-profile', (req, res) => {
    // console.log("Update user post incoming...");
    User.update({_id: mongojs.ObjectID(req.body.id)}, {$set: {   // First update the user profile
      username: req.body.newusername,
      firstname: req.body.newfirstname,
      lastname: req.body.newlastname,
      address1: req.body.newaddress1,
      address2: req.body.newaddress2,
      city: req.body.newcity,
      state: req.body.newstate,
      zip: req.body.newzip,
      jobSearchStatus: req.body.newjobsearchstatus,
      skill: req.body.newUserSkills
    }}, 
    function(error, result) {
      if (error) {
        console.log(error);
      }
      else {
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
            if (err) console.log(err)
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
              lastLogin: user.lastLogin,
              jobSearchStatus: user.jobSearchStatus
            })
          })

        })
      }
    });    
    
  })


  // Search for all recruiters by a given city
  app.get('/recruitersearch', function(req, res){
    // console.log('/recruitersearch route fired')
    database.collection("recruiters").find({city: req.query.city}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.send({response})
      }
    });
    
  })

  // Sign in route, detects if user or recruiter and redirects accordingly
  app.post('/api/signin',
    passport.authenticate(['user', 'recruiter']), function(req, res) {
      // console.log("Passport has fired!");
      // console.log(req.user)
      if (req.user.prefix === 'R') {
        res.json({
          id: req.user._id,
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          address1: req.user.address1,
          address2: req.user.address2,
          city: req.user.city,
          state: req.user.state,
          zip: req.user.zip,
          created: req.user.created,
          lastLogin: req.user.lastLogin,
          redirectTo: '/recruiterdashboard'
        });
      } else {
        res.json({
          id: req.user._id,
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          address1: req.user.address1,
          address2: req.user.address2,
          city: req.user.city,
          state: req.user.state,
          zip: req.user.zip,
          created: req.user.created,
          lastLogin: req.user.lastLogin,
          jobSearchStatus: req.user.jobSearchStatus,
          redirectTo: '/user-dashboard'
        });
      }
      
    }
  )
  
  // 
  app.get('/api/getuser', function(req, res) {
    // console.log('getuser get has fired')
    console.log(req.session)
    if (req.session.passport !== undefined) {  // If user is in fact signed in, then gather all their data
      database.collection("users").find({username: req.session.passport.user}, function(error, response) {
        if (error) {
          console.log('Error: ', error);
        }
        // If there are no errors, send the data to the browser as json
        else {
          if (response.length !== 0) {
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
              lastLogin: response[0].lastLogin,
              jobSearchStatus: response[0].jobSearchStatus,
              userSkills: response[0].skill
            })
          } else {
            console.log('not logged in')
          }
        }
      });
    } else {
      console.log('not logged in')
    }
    
  });


  // Save the recruiter to your database
  app.post('/saverecruiter', function(req, res){
    // const newSavedRecruiter = new savedRecruiter(req.body)
    let x = req.body.savedRecruiter

    console.log(req.body.savedRecruiter)
    console.log(req.body.userID)

    db.collection("savedRecruiters").insert({savedRecruiter: x}),
 
    User.findOneAndUpdate({_id: req.body.userID},{$push: {savedRecruiter: x}}, {new: true}).then(function(){
      console.log("success"),
      res.send(x + " added to the db")
    })
    
  })

  app.get("/api/signout", function(req, res) {
    // console.log("Signout has been fired!");
    // console.log(req.session.passport);
    req.session.destroy(function (err) {
      // console.log(req.session);
      console.log("Signout completed, now redirecting to index");
      res.send("Success")
    });
  });
  
  /////////////////// User routes ///////////////////
};
