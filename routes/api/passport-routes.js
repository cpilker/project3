const 
  passport = require('passport'),
  User = require('../../models/user'),
  Recruiter = require('../../models/recruiter'),
  mongoose = require('mongoose'),
  mongojs = require('mongojs'),
  path = require('path'),
  multer = require('multer'),
  crypto = require('crypto'),
  GridFsStorage = require('multer-gridfs-storage');

// let conn = mongoose.createConnection(process.env.MONGODB_URI || "mongodb://localhost/main")


module.exports = function(app) {

  // Database configuration
  var databaseUrl = "main";

  // Hook mongojs configuration to the db variable
  var db = mongojs(databaseUrl);
  db.on("error", function(error) {
    console.log("Database Error:", error);
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

  //Search for users by a given city [this is not for the data as a whole]
  app.get('/usersearch', function(req, res){
    console.log(req.query)
    db.collection("users").find({}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log("////////////////////////////////")
        console.log(response);
        res.send({response})
      }
    });
  })

  //Search for total users in the database
  app.get('/allusersavailable', function(req, res){
    console.log(req.body)
    // console.log("recruiter city")
    db.collection("users").find({}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log(response);
        res.send({count: response.length})
      }
    });
  });

  //Route to get the number of users Actively Searching for opportunities
  app.get('/activesearch', function(req, res){
    console.log(req.query)
    db.collection("users").find({jobSearchStatus: req.body.jobSearchStatus}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log("Number of people actively searching")
        console.log(response);
        res.send({count: response.length})
      }
    })
  })
  //Route to get the number of users Open to Opportunities for job searching
  app.get('/opentoopportunities', function(req, res) {
    // console.log(req.query);
    db.collection('users').find({jobSearchStatus: req.query.jobSearchStatus}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log("Number of people Open to Opportunities")
        console.log(response);
        res.send({count: response.length})
      }
    })
  })
  //Route to get the number of users that are NOT searching for a job
  app.get('/notsearching', function(req, res){
    console.log(req.query.skill);
    db.collection("users").find({jobSearchStatus: req.query.jobSearchStatus}, function(error, response) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log("Number of people not searching")
        console.log(response);
        res.send({count: response.length})
      }
    })
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

}