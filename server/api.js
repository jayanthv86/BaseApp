const router = require('express').Router();

module.exports = router;

//incase a use asks for a non existing route
//reply with 4040 error
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});