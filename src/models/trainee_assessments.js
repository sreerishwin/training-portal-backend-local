const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { STRING } = require('mysql/lib/protocol/constants/types');

const trainee_assessment = sequelize.define('trainee_assessment',{
    // id: { type: DataTypes.STRING, primaryKey:true,autoIncrement:true},
    trainee_id: { type: DataTypes.STRING, allowNull: false },
    assessment_id: { type: DataTypes.STRING, allowNull: false },
    due_date: { type: DataTypes.DATEONLY, allowNull: false },
    duration: {type:DataTypes.STRING,allowNull:false},
    performance_score: {type:DataTypes.INTEGER,allowNull:false},
    status: { type: DataTypes.ENUM('todo' ,' in_progress','hold',' completed'), allowNull: false },
},{
    timestamps:true,
});
module.exports = trainee_assessment;