const passport = require('passport');
const User = require('../../models/user');

module.exports = function(app) {

  app.post('/api/signup', function(req, res) {
    console.log("Post incoming...");
    console.log(req.body);
    User.register(new User(
      { 
        username: req.body.newemail,
        firstname: req.body.newfirstname,
        lastname: req.body.newlastname,
        address1: req.body.newaddress1,
        address2: req.body.newaddress2,
        city: req.body.newcity,
        state: req.body.newstate,
        zip: req.body.newzip
      }), req.body.newpassword, function(err, account) {
      if (err) {
          console.log(err);
      } else {
          console.log('New user added!');
          passport.authenticate('local')(req, res, function() {
            console.log('Done!');
            console.log(req);
            res.json({username: req.username});
          });
        }
      });
    }
  );
}