'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js');

console.log('IIIIIIIIIIIIIIIIin quantity and SKU');


/*
Quantity and SKU  model: holds a list of Discover program
range: (r4.2xlarge - r4.16xlarge)
 */
const Quantity_SKU = db.define('quantity_SKU', {
    range_value: Sequelize.STRING
});

module.exports = Quantity_SKU;