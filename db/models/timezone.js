'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js');

console.log('IIIIIIIIIIIIIIIIin timezone  model');
/*
Industry model: holds a list of industry titles
 */
const Timezone = db.define('time_zone', {
    time_zone: Sequelize.STRING
});

module.exports = Timezone;