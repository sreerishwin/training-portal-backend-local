const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { STRING } = require('mysql/lib/protocol/constants/types');
const Trainee = require('./trainee');
const Trainer = require('./trainer');

const Assessment = sequelize.define('Assessment',{
    // id: { type: DataTypes.STRING, primaryKey:true,autoIncrement:true},
    assessment_name: { type: DataTypes.STRING, allowNull: false },
    // to: {type:DataTypes.STRING,allowNull:false,references: {
    //     model: Trainee, 
    //     key: 'id'
    //   }},
    // created_by:{type: DataTypes.STRING, allowNull:false,references: {
    //     model: Trainer, 
    //     key: 'id'
    //   }},
    description: {type:DataTypes.STRING,allowNull:false},
    duration: {type:DataTypes.DATE,allowNull:false},
    status: { type: DataTypes.STRING, allowNull: false },
},{
    timestamps:true,
});
module.exports = Assessment;