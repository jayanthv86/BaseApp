const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../db/models/user');
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