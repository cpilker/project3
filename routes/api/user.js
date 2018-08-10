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

module.exports = function(app) {

  // GET route for display all
  app.get("/api/getuser", (req, res, next) => {
    console.log("Retreving current user");
    console.log(req);
  });
 
  app.post('/upload', upload.single('file'), (req, res) => {
    
  })

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

};
