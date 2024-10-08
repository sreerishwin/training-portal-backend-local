require('dotenv').config();

const d = require('dotenv');
console.log("DOTENV___________________________________", d)

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
});

console.log("USER NAME _______________", process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD)
module.exports = sequelize;
