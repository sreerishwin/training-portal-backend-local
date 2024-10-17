const dotenv = require('dotenv');
const express = require('express');
const sequelize = require('./config/database'); 

const authRoutes = require('./routes/authRoutes');

const cors = require('cors');

// models
const User = require('./models/User'); 
const Trainee = require('./models/trainee'); 
const Trainer = require('./models/trainer'); 
const assessment = require('./models/traineeAssessment'); 
const role = require('./models/roles'); 


//routes
const userRoutes = require('./routes/userRoutes');
const traineeRoutes = require('./routes/trainee');
const trainerRoutes = require('./routes/trainer');
const rolesRoutes = require('./routes/roles');
const t_assessmentRoutes = require('./routes/traineeAssessmentRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');




require ('dotenv').config();

const app = express();

sequelize.sync({alter:true})

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;

//NITHISH
app.use('/api/auth', authRoutes);


app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/trainees',traineeRoutes);
app.use('/api/trainers',trainerRoutes);
app.use('/api/roles',rolesRoutes);
app.use('/api/trainee_assessments',t_assessmentRoutes);
app.use('/api/assessments',assessmentRoutes);





const syncDatabase = async () => {
    try {
        await User.sync({ alter: true }); // Sync the User model
        console.log('User table synced successfully');
    } catch (error) {
        console.error('Error syncing User table:', error);
    }
};

const startServer = async () => {
    try {
        await syncDatabase(); // Sync before starting the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`); 
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();