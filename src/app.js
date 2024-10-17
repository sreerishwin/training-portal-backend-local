require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); 

const User = require('./models/User'); 
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


