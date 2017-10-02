

const router = require('express').Router();
const User = require('../db/models/user');
const passport = require('passport');
const Industry = require('../db/models/industry');

//router.use('/industry', require('./industry'));

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
                                 failureRedirect: '/api/login',
                                 failureFlash: true })
);

router.get('/login', function(req, res, next) {
 
  var err = req.flash('message')[0];
  console.log("get login message",err);
  //res.send(req.flash);
 //res.render('login');
 res.statusMessage = err;
 //res.status(404).end();

 res.status(401).send({success: false, error: {message: err}});
//  var error = new Error(err);
//  error.code = 400;
//  res.status(400);
//  console.log('error message',error.message);
//  //return next(error)
//  res.status(404).send(error);
//return next(new Error(res.statusMessage));
});

router.post('/signup', function (req, res, next) {
  console.log('in signup api req.body',req.body);
  User.findOrCreate({
    where: {
      email: req.body.email,
      password: req.body.password
    },
    defaults: { // if the user doesn't exist, create including this info
      //password: req.body.password
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      companyName: req.body.company,
      emplTitle: req.body.employeeTitle,
      industry: req.body.industry
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

//router.use('/industry', require('./industry'));
//router.use('/industry', require('./industry'));

router.get('/industry',function(req,res,next) {
    console.log('GOT INDUSTRIES - industry:',Industry);
    Industry.findAll({})
        .then( industries => {
            console.log('GOT INDUSTRIES:',industries);
            res.status(200).json(industries)})
        .catch(next);
      });
module.exports = router;

//incase a use asks for a non existing route
//reply with 4040 error
// router.use(function (req, res, next) {
//   const err = new Error('Not found.');
//   err.status = 404;
//   next(err);
// });
