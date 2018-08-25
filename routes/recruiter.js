
// Requiring our dependencies 
const
  passport = require('passport'),
  Recruiter = require('../models/recruiter'),
  mongoose = require('mongoose'),
  mongojs = require('mongojs'),
  Grid = require('gridfs-stream'),
  path = require('path'),
  savedUser = require("../models/savedUser")
  multer = require('multer'),
  crypto = require('crypto'),
  GridFsStorage = require('multer-gridfs-storage'),
  email 	= require("emailjs")
  server 	= email.server.connect({
    user: 'hello@ryanadiaz.com',
    password: 'testpassword',
    host: 'mail.ryanadiaz.com',
    port: 587,
    tls:  false
  });

// Database configuration
const databaseUrl = process.env.MONGODB_URI || "mongodb://localhost/main";

// Hook mongojs configuration to the db variable
const db = mongojs(process.env.MONGODB_URI || "main");
db.on("error", function(error) {
    console.log("Database Error:", error);
});
  

module.exports = function(app) {

  app.get('/api/loadrecruiter', function(req, res) {
    console.log('loadrecruiter get has fired')
    db.collection("recruiters").find({username: req.session.passport.user}, function(error, response) {
      if (error) {
        console.log('Error: ', error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        console.log(response)
        res.send({
          id: response[0]._id,
          username: response[0].username,
          company: response[0].company,
          firstname: response[0].firstname,
          lastname: response[0].lastname,
          address1: response[0].address1,
          address2: response[0].address2,
          city: response[0].city,
          state: response[0].state,
          zip: response[0].zip,
          created: response[0].created,
          lastLogin: response[0].lastLogin,
          jobSearchStatus: response[0].jobSearchStatus
        })
      }
    });
  });

  app.post('/api/recruitersignup', (req, res) => {
    console.log("Recruiter signup post incoming...");
   
    Recruiter.register(new Recruiter(
      { 
        company: req.body.newcompany,
        firstname: req.body.newfirstname,
        lastname: req.body.newlastname,
        username: req.body.username,
        password: req.body.password,
        address1: req.body.newaddress1,
        address2: req.body.newaddress2,
        city: req.body.newcity,
        state: req.body.newstate,
        zip: req.body.newzip,
        phone1: req.body.newphone
      }), req.body.password, function(err, account) {
      if (err) {
        console.log("error found in passport-routes.js line 221!");
          console.log(err);
          res.json({err});
      } else {
          console.log('New recruiter added!');
          passport.authenticate('recruiter')(req, res, function() {
            console.log('Done!');
            res.json({username: req.user.username});
          });
        }
      });
    }
  );

  //Search for users by a given city [this is not for the data as a whole]
  app.get('/usersearch', function(req, res){
    console.log(req.query)
    // console.log("recruiter city")
    db.collection("users").find({}, function(error, response) {
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
    // console.log(req.query)
    db.collection("users").find({jobSearchStatus: req.query.jobSearchStatus}, function(error, response) {
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
    console.log(req.query.jobSearchStatus);
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

  // Save the recruiter to your database
  app.post('/saveuser', function(req, res){
    let x = req.body.savedUser
    console.log(x)
    console.log(req.body.recruiterID)

    db.collection("savedUsers").insert({savedUser: x}),
 
    User.findOneAndUpdate({_id: req.body.recruiterID},{$push: {savedUser: x}}, {new: true}).then(function(){
      console.log("success"),
      res.send(x + " added to the db")
    })
  })

  // Update recruiter profile
  app.post('/api/update-recruiter-profile', (req, res) => {
    console.log("Update recruiter post incoming...");
    Recruiter.update({_id: mongojs.ObjectID(req.body.id)}, {$set: {   // First update the user profile
      username: req.body.newusername,
      company: req.body.newcompany,
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
        Recruiter.findOne({_id: mongojs.ObjectID(req.body.id)}, function(error, user) {
          if (req.body.newpassword != null) {   // Second update the password if necessary
            user.setPassword(req.body.newpassword, function(err) {
              if (err) {
                console.log(err);
              } else {
                user.save(function(err) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Recruiter updated!")
                  }
                })
              }
            })
          }
          req.login(user, function(err) {   // Third refresh the session with new email address if changed
            if (err) return next(err)
            res.send({
              id:user._id,
              username: user.username,
              company: user.company,
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
 
}