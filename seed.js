//requiring the data base and the models
var db = require('./db');
var User = require('./db/models/user');
var Industry = require('./db/models/industry');
var EmployeeTitle = require('./db/models/employee_title');
var Timezone = require('./db/models/timezone');
var Quantity_SKU = require('./db/models/quantity_SKU');
var Data_set = require('./db/models/data_set');
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

function generateEmployeeTitles () {
    var employeeTitles =[];
    employeeTitles.push(EmployeeTitle.build({
        title: 'CEO'
    }));

    employeeTitles.push(EmployeeTitle.build({
        title: 'Executive'
    }));
    
    employeeTitles.push(EmployeeTitle.build({
        title: 'Analyst'
    }));

    employeeTitles.push(EmployeeTitle.build({
        title: 'Individual Contributor'
    }));
    
    return employeeTitles;

}

function generateTimeZones () {
    var timeZones = [];
    timeZones.push(Timezone.build({
        time_zone: ' '

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-12'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-11.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-11'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-10.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-10'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-9.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-9'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-8.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-8'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-7.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-7'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-6.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-6'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-5.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-4.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-4'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-3.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-3'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-2.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-2'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-1.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-1'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT-0.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+0.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+1'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+1.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+2'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+2.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+3'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+3.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+4'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+4.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+5.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+6'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+6.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+7'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+7.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+8'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+8.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+9'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+9.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+10'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+10.5'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+11'

    }));
    timeZones.push(Timezone.build({
        time_zone: 'GMT+11.5'

    }));

    timeZones.push(Timezone.build({
        time_zone: 'GMT+12'

    }));
    return timeZones;
}

function generateQuantitySKUs () {
    var quantitySKUs =[];
    quantitySKUs.push(Quantity_SKU.build({
        range_value: 'r4.2xlarge'
    }));

    quantitySKUs.push(Quantity_SKU.build({
        range_value: 'r4.4xlarge'
    }));

    quantitySKUs.push(Quantity_SKU.build({
        range_value: 'r4.8xlarge'
    }));

    quantitySKUs.push(Quantity_SKU.build({
        range_value: 'r4.16xlarge'
    }));
    
    
    return quantitySKUs;

}

function generateDataSets () {
    var deteSets =[];
    deteSets.push(Data_set.build({
        dataset: 'weather'
    }));

    deteSets.push(Data_set.build({
        dataset: 'baseball'
    }));

   return deteSets;

}

function createIndustries () {
    return Promise.map(generateIndustries(), function (industryTitle) {
      return industryTitle.save();
    });
}

function createEmployeeTitles () {
    return Promise.map(generateEmployeeTitles(), function (employeeTitle) {
      return employeeTitle.save();
    });
}

function createTimeZones () {
    return Promise.map(generateTimeZones(), function (timeZone) {
      return timeZone.save();
    });
}



function createTQuantitySKU () {
    return Promise.map(generateQuantitySKUs(), function (value) {
      return value.save();
    });
}

function createDataSet () {
    return Promise.map(generateDataSets(), function (value) {
      return value.save();
    });
}

function seed () {
    return createIndustries()
    .then(function () {
      return createEmployeeTitles()
    })
    .then(function(){
        return createTimeZones()
    })
    .then(function () {
        return createTQuantitySKU()
    })
    .then(function () {
        return createDataSet()
    })
    .then(function () {
        console.log('created seeding arrays');
    });
  }


db.sync({})
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