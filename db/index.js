var Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const db = new Sequelize('postgres://localhost:5432/basic_web_app', { 
    logging: false 
});

var User = db.define('user', {
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
   }
}, {
	hooks: {
		beforeCreate: setSaltAndPassword,
    	beforeUpdate: setSaltAndPassword

	},
	instanceMethods: {
		correctPassword: function(candidatePassword){
			return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
		},
		//returns just the info we want to show in the front end - the email
		sanitize: function(){
			return _.omit(this.toJSON(), ['password', 'salt']);
		}
	},
	classMethods: {
		encryptPassword: function(plainText, salt){
			const hash = crypto.createHash('sha1');
			hash.update(plainText);
			hash.update(salt);
			return hash.digest('hex');
		}
	}
});

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
 	User: User
 };

