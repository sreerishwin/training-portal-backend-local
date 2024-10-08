require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); 
const authRoutes = require('./routes/authRoutes');
const User = require('./models/User'); 
const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
       
        await sequelize.sync(); 
        // await User.sync({ force: true })
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`); 
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
