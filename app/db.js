const Sequelize = require("sequelize");

const sequelize = new Sequelize(null, null, null, {
  host: "localhost",
  dialect: "sqlite",
});

module.exports = sequelize;
