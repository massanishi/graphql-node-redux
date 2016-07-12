const Sequelize = require("sequelize")
const db = require("../db")

const Client = db.define("client", {
  label: {
    type: Sequelize.STRING,
  },
});

module.exports = Client;