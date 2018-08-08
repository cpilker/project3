module.exports = function(app, passport) {

     app.get('/signup', function(req, res) {
        res.render('signup', {
            statusMessage: req.flash('statusMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard', 
        failureRedirect: '/signup',
        failureFlash: true
    }))

    app.get('/signin', function(req, res) {
        res.render('signin', {
            statusMessage: req.flash('statusMessage')
        });
    });

    app.post('/signin', passport.authenticate('local-signin',  { 
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard', {
            email: req.user.email,
            password: req.user.password,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            address1: req.user.address1,
            address2: req.user.address2,
            city: req.user.city,
            state: req.user.state,
            zip: req.user.zip,
            lastlogin: req.user.last_login,
            skills: req.user.skill,
            resume: req.user.resume,
            status: req.user.status,
            createdAt: req.user.createdAt,
            updatedAt: req.user.updatedAt
        });
    });

    app.get('/fail', function(req, res) {
        res.render('fail', {
            statusMessage: req.flash('statusMessage')
        });
    });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/');
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) 
            return next();
        res.redirect('/signin');
    }
 
}