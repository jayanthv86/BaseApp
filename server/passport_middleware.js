const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../db/index').User;
const router = require('express').Router();

router.use(passport.initialize());
router.use(passport.session());

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback : true
},
  function(req,inEmail, inPassword, done) {
    var curUser=null;
    User.findAll({ 
      where: {
        email: inEmail 
      }
    }).then(users => {
      
      if (users.length === 0) {


        req.flash('message', "Incorrect email");
        return done(null, false, { message: 'Incorrect email' });
          //return done(null, false, req.flash('message', "Incorrect email"));
      }
      curUser = users.filter(function(element) {
        if(element.correctPassword(inPassword))
        {
          return element;
        }
      });
      if(!curUser){
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, curUser[0]);
          
      });
    
      
    
  }
));

/*
console.log('in logout req.user',req.user);
  var user=null;
  User.findAll({
    where: {
      email: req.body.email

    }
  }).then(users => {
    //if there is no user with the input email - returns WRONG_EMAIL
    console.log('findig all users, users', users);
    if(!users.length)
    {
      res.status(401).send('Incorrect email');
    }
    user = users.filter(function(element) {
      if(element.correctPassword(req.body.password))
      {
        return element;
      }
      
    });
    //if the password is incorrect - return wrong_password
    if(!user)
    {
      res.status(401).send('Incorrect password');
    }
    //with Passport:
      req.logIn(user[0], function (err) {
        if (err) return next(err);
        res.json(user[0]);
      });

  }).catch(next);
    
 */




passport.serializeUser(function (user, done) {
  console.log('in serialize user',user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('in deserialize user id', id);
  User.findById(id)
  .then(user => done(null, user))
  .catch(done);
});

module.exports = router;