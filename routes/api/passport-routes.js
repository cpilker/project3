const passport = require('passport');
const User = require('../../models/user');

module.exports = function(app) {

  app.post('/api/signup', function(req, res) {
    console.log("Post incoming...");
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
          passport.authenticate('local')(req, res, function() {
            console.log(req.user);
            console.log('Done!');
            res.json({username: req.user.username});
          });
        }
      });
    }
  );

  app.get('/user-dashboard', isLoggedIn, function(req, res) {
    res.json({username: req.body.username});
  });

  function isLoggedIn(req, res, next) {
    if (req.user) 
      return next();
    res.redirect('/');
  }

}