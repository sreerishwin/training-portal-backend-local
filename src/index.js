const express = require('express');
const sequelize = require('./config/database'); 
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', userRoutes); // Mount user routes

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync models
        await User.sync(); // Ensure the User model is synchronized with the database

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();