const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const User = require("../models/User");
const Estate = require("../models/Estate");

const connection = new Sequelize(dbConfig);

User.init(connection);
Estate.init(connection);

//User.associate(connection.models);

module.exports = connection;