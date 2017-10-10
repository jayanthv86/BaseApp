

const router = require('express').Router();
const User = require('../db/models/user');
const passport = require('passport');
const Industry = require('../db/models/industry');
const Employee_title = require('../db/models/employee_title');
const Timezone = require('../db/models/timezone');
const QuantitySKU = require('../db/models/quantity_SKU');
const Dataset = require('../db/models/data_set');
const Company = require('../db/models/company');
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
  User.findOrCreate({
    where: {
      email: req.body.email,
      password: req.body.password
    },
    defaults: { // if the user doesn't exist, create including this info
      //password: req.body.password
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      company_id: req.body.company_id,
      account_state: req.body.accoun_state,
      employee_title_id: req.body.employeeTitle,
      admin: req.body.admin
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



//put request to add preferences to a newly created user
router.put('/signup', function (req, res, next) {
  console.log('in put user', req.user);
  
  User.findById(req.user.id,{
    include: [ Dataset ]
  })
  .then((user) => {
    if(req.body.paymentAmount){
      user.update({
        payment_amount: req.body.paymentAmount
      });

    }
    if(req.body.datasetIds){
      user.addData_sets(req.body.datasetIds);
    }
    if(req.body.time_zone_id){
      user.update({
        time_zone_id: req.body.time_zone_id
      });

    }
    if(req.body.quantity_s_k_u_id){
      user.update({
        quantity__s_k_u_id: req.body.quantity_s_k_u_id
      });

    }
    res.status(201).json(user);
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
    //console.log('GOT INDUSTRIES - industry:',Industry);
    Industry.findAll({})
        .then( industries => {
            console.log('GOT INDUSTRIES:',industries);
            res.status(200).json(industries)})
        .catch(next);
      });



//fetching employee title list
router.get('/employee_title',function(req,res,next) {
  console.log('GOT EMPLOYEE TITLES - TITLES:',Employee_title);
  Employee_title.findAll({})
      .then( titles => {
          console.log('GOT titles:',titles);
          res.status(200).json(titles)})
      .catch(next);
    });


//fetching all time zones
router.get('/timezone',function(req,res,next) {
  Timezone.findAll({})
      .then( timezones => {
          console.log('GOT time zones:',timezones);
          res.status(200).json(timezones)})
      .catch(next);
    });

//fetching all quantities and SKUs
router.get('/quantity_SKU',function(req,res,next) {
  QuantitySKU.findAll({})
      .then( values => {
          console.log('GOT quantities and SKUs:',values);
          res.status(200).json(values)})
      .catch(next);
    });


//fgetching all data sets
router.get('/dataset',function(req,res,next) {
  Dataset.findAll({})
      .then( values => {
          console.log('GOT Data sets:',values);
          res.status(200).json(values)})
      .catch(next);
    });

//fetching all companies or the account_state options
router.get('/company',function(req,res,next) {
  if(req.query.state === 'true'){
    console.log('GOT QUERY');
    let accountStates = Company.rawAttributes.account_state.values;
    res.status(200).send(accountStates);

  }
  else{
    Company.findAll({})
    .then( values => {
        console.log('GOT Data sets:',values);
        res.status(200).json(values)})
    .catch(next);
  }
});

//adding a new company to the companies table
router.put('/api/company', function(req,res,next){
  Company.create({
    name: req.body.name,
    account_state: req.body.account_state,
    industry_id: req.body.industry_id

  }).then((company)=>{
    res.status(201).json(company);

  }).catch(next);

});


module.exports = router;

//incase a use asks for a non existing route
//reply with 4040 error
// router.use(function (req, res, next) {
//   const err = new Error('Not found.');
//   err.status = 404;
//   next(err);
// });
