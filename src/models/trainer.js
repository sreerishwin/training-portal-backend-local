const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainer = sequelize.define('Trainer',{
    id: { type: DataTypes.STRING, primaryKey:true,autoIncrement:true},
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
},{
    timestamp:true,
});
module.exports = Trainer;