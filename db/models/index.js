'use strict';

var db = require('../');
var User = require('./user');
var Employee_title = require('./employee_title');
var Industry = require('./industry');

console.log('in assosiating idex user',User);
console.log('in assosiating idex employee',Employee_title);
console.log('in assosiating idex industry',Industry);

User.belongsTo(Employee_title,{through: 'employee_title_id'});
User.belongsTo(Industry,{through: 'Industry_id'});

//module.exports = {User, Employee_title, Industry};
module.exports = db;