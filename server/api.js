const router = require('express').Router();
const User = require('../db/index').User;

// check currently-authenticated user, i.e. "who am I?"
router.get('/me', function (req, res, next) {
  // with Passport:
  res.send(req.user);
  
});


// signup, i.e. "let `me` introduce myself"
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
    if (created) {
      // with Passport:
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
      
    } else {
      res.sendStatus(401); // this user already exists, you cannot sign up
    }
  });
});

// login, i.e. "you remember `me`, right?"
router.put('/login', function (req, res, next) {
  User.findOne({
    where: req.body // email and password
  })
  .then(user => {
    if (!user) {
      res.sendStatus(401); // no message; good practice to omit why auth fails
    } 
    else if (!user.correctPassword(req.body.password)){
    	res.status(401).send('Incorrect password');

    } 
    	else {
      // with Passport:
      req.logIn(user, function (err) {
        if (err) return next(err);
        res.json(user);
      });
      
    }
  })
  .catch(next);
});


// logout, i.e. "please just forget `me`"
router.delete('/logout', function (req, res, next) {
  // with Passport
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


