const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const sequelize = require('./config/database'); 

// models
const User = require('./models/User'); 
const Trainee = require('./models/trainee'); 
const Trainer = require('./models/trainer'); 
const assessment = require('./models/traineeAssessment'); 
const role = require('./models/roles'); 
// const assessment = require('./models/traineeAssessment'); 


//routes
const userRoutes = require('./routes/userRoutes');
const traineeRoutes = require('./routes/trainee');
const trainerRoutes = require('./routes/trainer');
// const assessmentRoutes = require('./routes/traineeAssessmentRoutes');
const rolesRoutes = require('./routes/roles');
const t_assessmentRoutes = require('./routes/traineeAssessmentRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/trainees',traineeRoutes);
app.use('/api/trainers',trainerRoutes);
// app.use('/api/assessments',assessmentRoutes);
app.use('/api/roles',rolesRoutes);
app.use('/api/trainee_assessments',t_assessmentRoutes);
app.use('/api/assessments',assessmentRoutes);




const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync models
        // await User.sync(); 
        // await Trainer.sync({force: true});
        // await Trainee.sync();
        // await assessment.sync({force: true});
        // await role.sync({force: true});
        // await trainee_assessment.sync({force: true});

        await sequelize.sync({ alter: true })


        app.listen(PORT, () => {const cors = require('cors');

            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();