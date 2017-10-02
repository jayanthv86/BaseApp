//requiring the data base and the models
var db = require('./db');
var User = require('./db/models/user');
var Industry = require('./db/models/industry');
var EmployeeTitle = require('./db/models/employee_title');
var Promise = require('bluebird');


function generateIndustries () {
    var industries=[];
    industries.push(Industry.build({
        title: 'Advertising'
    }));
    industries.push(Industry.build({
        title: 'CPG'
    }));
    industries.push(Industry.build({
        title: 'Education/Research'
    }));
    industries.push(Industry.build({
        title: 'Government'
    }));
    industries.push(Industry.build({
        title: 'Retail'
    }));
    industries.push(Industry.build({
        title: 'Telecom'
    }));
    industries.push(Industry.build({
        title: 'Technology'
    }));
    industries.push(Industry.build({
        title: 'Utilities'
    }));
    return industries;

}

function createIndustries () {
    return Promise.map(generateIndustries(), function (industryTitle) {
      return industryTitle.save();
    });
}

function seed () {
    return createIndustries()
    .then(function () {
      console.log('created industries titles');
    });
  }

console.log('Syncing database');

db.sync({force: true})
.then(function () {
  console.log('Seeding database');
  return seed();
})
.then(function () {
  console.log('Seeding successful');
}, function (err) {
  console.error('Error while seeding');
  console.error(err.stack);
})
.finally(function () {
  db.close();
  return null;
});