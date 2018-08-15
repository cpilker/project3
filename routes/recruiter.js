
// Requiring our dependencies 
const
  passport = require('passport'),
  User = require('../../models/user'),
  Recruiter = require('../../models/recruiter'),
  mongoose = require('mongoose'),
  mongojs = require('mongojs'),
  Grid = require('gridfs-stream'),
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

// Database configuration
const databaseUrl = "main";

// Hook mongojs configuration to the db variable
const db = mongojs(databaseUrl);
db.on("error", function(error) {
    console.log("Database Error:", error);
});
  

module.exports = function(app) {



  //Search for users by a given city [this is not for the data as a whole]
  app.get('/usersearch', function(req, res){
    console.log(req.query)
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
    db.collection("users").find({skill: req.body.skill}, function(error, response) {
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
    db.collection('users').find({skill: req.query.skill}, function(error, response) {
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
    db.collection("users").find({skill: req.query.skill}, function(error, response) {
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

};