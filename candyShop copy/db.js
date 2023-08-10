const Sequelize = require("sequelize");

const db = new Sequelize("candy_shop_db", "root", "Ankit@123", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = db;
