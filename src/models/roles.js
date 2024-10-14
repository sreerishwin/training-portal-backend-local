const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role',{
    // id: { type: DataTypes.STRING, primaryKey:true,autoIncrement:true},
    role_name: { type: DataTypes.STRING, allowNull: false,unique: true },
    role_description: {type:DataTypes.STRING,allowNull:false},
    // duration: {type:DataTypes.STRING,allowNull:false},
    status: { type: DataTypes.STRING, allowNull: false },
},{
    timestamps:true,
});
module.exports = Role;