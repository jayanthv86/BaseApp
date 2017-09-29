var Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const WRONG_EMAIL = '0';
const WRONG_PASSEORD = '1';

const db = new Sequelize('postgres://localhost:5432/1010DataUser', { 
    logging: false 
});

var User= db.define('user',{
name: {
  type: Sequelize.STRING
},
email: {
  type: Sequelize.STRING,
  isEmail: true,
  allowNull: false
},
password: {
type: Sequelize.STRING
 },
 salt: {
  type: Sequelize.STRING
 },
 companyName: {
  type: Sequelize.STRING
 },
 emplTitle: {
  type: Sequelize.STRING
},
 industry: {
  type: Sequelize.STRING
 }
},{
  hooks: {
		beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword

	}
});

//class Methods
User.encryptPassword = function(plainText, salt){
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');

}


//instance Methods:
User.prototype.correctPassword = function(candidatePassword){
  return User.encryptPassword(candidatePassword, this.salt) === this.password;

}

User.prototype.sanitize = function(){
  return _.omit(this.toJSON(), ['password', 'salt']);
}



function generateSalt1 () {
	return crypto.randomBytes(16).toString('base64');	//Base64 a binary-to-text encoding
}

function encryptPassword1 (plainText, salt) {
	const hash = crypto.createHash('sha1');
	hash.update(plainText);
	hash.update(salt);
	return hash.digest('hex');
}

//setSaltAndPassword creates a salt and an encypted password 
//for a user 
function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = generateSalt1();
    user.password = encryptPassword1(user.password, user.salt);
  }

}

module.exports = {
   User: User,
   WRONG_EMAIL: WRONG_EMAIL,
   WRONG_PASSEORD: WRONG_PASSEORD

 };

