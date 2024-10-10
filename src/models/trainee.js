const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainee = sequelize.define('Trainee', {
    // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    joinedDate: { type: DataTypes.DATEONLY, allowNull: false },
    trainingPeriod: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
}, {
    timestamps: true,
});
module.exports = Trainee;