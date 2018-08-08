 
  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');

  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;


  passport.serializeUser(function(user, done) {
          done(null, user.id);
      });


  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id).then(function(user) {
        if(user){
          done(null, user.get());
        }
        else{
          done(user.errors,null);
        }
      });

  });


  passport.use('local-signup', new LocalStrategy(
    {           
      usernameField : 'newemail',
      passwordField : 'newpassword',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, email, password, done){
      console.log(req.body);
      console.log("passport.js has fired!");
      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

       User.findOne({where: {email:email}}).then(function(user){

      if(user)
      {
        return done(null, false, req.flash('statusMessage', 'That email is already taken'));
      }

      else
      {
        var userPassword = generateHash(password);
        var data =
        { email: email,
          password: userPassword,
          firstname: req.body.newfirstname,
          lastname: req.body.newlastname,
          address1: req.body.newaddress1,
          address2: req.body.newaddress2,
          city: req.body.newcity,
          state: req.body.newstate,
          zip: req.body.newzip,
          resume: req.body.newresume,
          skill: req.body.skill

        };

        User.create(data).then(function(newUser,created){
          
          if(!newUser){
            return done(null,false);
          }

          if(newUser){
            return done(null,newUser);
            
          }


        });
      }


    }); 



  }



  ));
    
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
    
  { 

  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, email, password, done) {

    var User = user;

    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }

    User.findOne({ where : { email: email}}).then(function (user) {
      
      if (!user) {
        return done(null, false, req.flash('statusMessage', 'Email does not exist!'));
      }

      if (!isValidPassword(user.password,password)) {

        return done(null, false, req.flash('statusMessage', 'Password is incorrect'));

      }

      var userinfo = user.get();

      return done(null,userinfo);

    }).catch(function(err){

      console.log("Error:",err);

      return done(null, false, req.flash('statusMessage', 'Something went wrong!'));


    });

  }
  ));

  }

