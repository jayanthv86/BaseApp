var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/basic_web_app', { 
    logging: false 
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false
    }
});

module.exports = {
	Db: db
};