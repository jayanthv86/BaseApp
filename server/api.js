

const router = require('express').Router();
const User = require('../db/index').User;
const WRONG_EMAIL = require('../db/index').WRONG_EMAIL;
const WRONG_PASSEORD = require('../db/index').WRONG_PASSEORD;
const passport = require('passport');

// check currently-authenticated user, i.e. "who am I?"
router.get('/me', function (req, res, next) {
  // with Passport:
  console.log("req .session",req.session);
  console.log("%%%%%%%%req .session",req.session);
  res.send(req.user);

  
});


// signup, i.e. "let `me` introduce myself"
router.post('/login/local',
passport.authenticate('local', { successRedirect: '/',
                                 failureRedirect: '/login',
                                 failureFlash: true })
);
router.post('/signup', function (req, res, next) {
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: { // if the user doesn't exist, create including this info
      password: req.body.password
    }
  })
  .spread((user, created) => {
  	console.log("User, Created", user,created);
    if (created) {
      // with Passport:
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
      
    } else {
      res.sendStatus(401); // this user already exists, you cannot sign up
    }
  })
  .catch(next);
});

// login, i.e. "you remember `me`, right?"
// router.post('/login', function (req, res, next) {
//   console.log('in logout req.user',req.user);
//   var user=null;
//   User.findAll({
//     where: {
//       email: req.body.email

//     }
//   }).then(users => {
//     //if there is no user with the input email - returns WRONG_EMAIL
//     console.log('findig all users, users', users);
//     if(!users.length)
//     {
//       res.status(401).send('Incorrect email');
//     }
//     user = users.filter(function(element) {
//       if(element.correctPassword(req.body.password))
//       {
//         return element;
//       }
      
//     });
//     //if the password is incorrect - return wrong_password
//     if(!user)
//     {
//       res.status(401).send('Incorrect password');
//     }
//     //with Passport:
//       req.logIn(user[0], function (err) {
//         if (err) return next(err);
//         res.json(user[0]);
//       });

//   }).catch(next);
    
//   });
  


// logout, i.e. "please just forget `me`"
router.delete('/logout', function (req, res, next) {
  // with Passport
  console.log('in logout req.user',req.user);
  req.logOut();
  res.sendStatus(204);
});


module.exports = router;

//incase a use asks for a non existing route
//reply with 4040 error
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});


