const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { STRING } = require('mysql/lib/protocol/constants/types');

const Assessment = sequelize.define('Assessment',{
    // id: { type: DataTypes.STRING, primaryKey:true,autoIncrement:true},
    assessment_name: { type: DataTypes.STRING, allowNull: false },
    created_by:{type: DataTypes.STRING, allowNull:false},
    description: {type:DataTypes.STRING,allowNull:false},
    duration: {type:DataTypes.INTEGER,allowNull:false},
    status: { type: DataTypes.STRING, allowNull: false },
},{
    timestamps:true,
});
module.exports = Assessment;