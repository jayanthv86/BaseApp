const Industry = require('../db/models/industry');

module.exports = require('express').Router()
.get('/industry',function(req,res,next) {
    Industry.findAll()
        .then( industries => {
            console.log('GOT INDUSTRIES:',industries);
            res.status(200).json(industries)})
        .catch(next);
});