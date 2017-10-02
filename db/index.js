var Sequelize = require('sequelize');
const pkg = require('../package.json');
const chalk = require('chalk');
const app = require('../APP');
const name = (app.env.DATABASE_NAME || app.name) +
(app.isTesting ? '_test' : '')

const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${pkg.name}`;

///////////////////////////////////////////////////////////////////////
var databaseURI = `postgres://localhost:5432/${pkg.name}`;

var db = module.exports = new Sequelize(databaseURI, {
  logging: require('debug')('sql'),
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

// Object.assign(db, require('./models'));
// console.log('DATA BASE AFTER ASSIGN',db);
// // We'll also make sync available. It's sometimes useful in tests.
// //{sync})

// //syncing all data bases
// function sync(force=false, retries=0, maxRetries=5){
//   console.log("^^^^^^%%%%%^^^got to sync");
//   return db.sync({force})
//   .then(ok => console.log(`Synced models to db ${connectionString}`))
//   .catch(fail => {
//     // Don't do this auto-create nonsense in prod, or
//     // if we've retried too many times. 
//     if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
//       console.error(chalk.red(`********** database error ***********`))
//       console.error(chalk.red(`    Couldn't connect to ${connectionString}`))
//       console.error()
//       console.error(chalk.red(fail))
//       console.error(chalk.red(`*************************************`))
//       return
//     }
//     // Otherwise, do autocreate
//     console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
//     return new Promise((resolve, reject) =>
//       require('child_process').exec(`createdb "${name}"`, resolve)
//     ).then(() => sync(true, retries + 1)).catch((err)=>{console.log('EROR CREATEING DTATA BASE'.err)});
//   })

// } 

// db.didSync = sync();

//module.exports = db;
