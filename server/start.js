const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db_user = require('../db/index').User; 
const session = require('express-session');
//const passport = require('passport');





//looging data
app.use(morgan('dev'));

//serving statuc files
app.use(express.static(path.join(__dirname, '../public')));

//using body-parser to easially parse body information in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//when there is '/api' in the rout, look in api.js for the 
//routing redirection
app.use('/api', require('./api'));

//if no route was found for the routing request, serves index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


//for internal server problems, sends 500 error message
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


//setting the session in the middleware, the session hold
//information about the current user
//on our deployment server, we can set an environment variable called SESSION_SECRET with our real secret
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  resave: false,
  saveUninitialized: false
}));


//initializing passport to get req.session with the user info on it
// app.use(passport.initialize());
// app.use(passport.session());
app.use(require('./passport_middleware'));

//starting up the server:
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
// app.listen(port, function () {
//   console.log(`*** starting server, listening on port ${port} ***`);
// });



//syncing the user table in the data base
db_user.sync({force: true})  // sync our database
  .then(function(){	// then start listening with our express server once we have synced
    app.listen(port, function(){
    	console.log(`*** starting server, listening on port ${port} ***`);

    }); 
  })
  .catch(function(error){
  	console.log(error);
  });





