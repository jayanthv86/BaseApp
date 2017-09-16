const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db'); 



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


//for interna server problems, sends 500 error message
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

//starting up the server:
const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
// app.listen(port, function () {
//   console.log(`*** starting server, listening on port ${port} ***`);
// });

db.sync()  // sync our database
  .then(function(){	// then start listening with our express server once we have synced
    app.listen(port, function(){
    	console.log(`*** starting server, listening on port ${port} ***`);

    }); 
  })





