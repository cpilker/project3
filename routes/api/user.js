// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Requiring our dependencies 
var db = require("../models");
var email 	= require("emailjs");
var server 	= email.server.connect({
  user: 'hello@ryanadiaz.com',
  password: 'testpassword',
  host: 'mail.ryanadiaz.com',
  port: 587,
  tls:  false
});

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for display all
  app.get("/api/users", function(req, res) {
    db.user.findAll({}).then(function(results) {
      res.json(results)
    })
  });
 

  // Get route for retrieving a single piece of data
  app.get("/api/posts/:id", function(req, res) {
   
  });

  // POST route for saving information when a new user requests information
  app.post("/api/userContacts", function(req, res) {
    console.log(req.body)
    db.userContact.create(req.body).then(function(dbPost){
      res.json(dbPost)
    })
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


  // DELETE route for deleting a piece of data
  app.delete("/api/posts/:id", function(req, res) {
    
  });

  // PUT route for updating a piece of data
  app.put("/api/posts", function(req, res) {
   
  });

};
