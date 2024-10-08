const express = require('express');
const sequelize = require('./config/database'); 
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User'); 
const traineeRoutes = require('./routes/trainee');
const Trainee = require('./models/trainee'); 
const trainerRoutes = require('./routes/trainer');
const Trainer = require('./models/trainer'); 
const assessmentRoutes = require('./routes/assessment');
const assessment = require('./models/assessments'); 
const rolesRoutes = require('./routes/roles');
const t_assessmentRoutes = require('./routes/trainee_assessment');

const role = require('./models/roles'); 
const trainee_assessment = require('./models/trainee_assessments'); 
const cors = require('cors');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes); // Mount user routes
app.use('/api/trainee',traineeRoutes);
app.use('/api/trainer',trainerRoutes);
app.use('/api/assessments',assessmentRoutes);
app.use('/api/roles',rolesRoutes);
app.use('/api/trainee_assessments',t_assessmentRoutes);




const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync models
        await User.sync(); 
        // await Trainer.sync({force: true});
        // await Trainee.sync();
        await assessment.sync({force: true});
        await role.sync({force: true});
        await trainee_assessment.sync({force: true});


        app.listen(PORT, () => {const cors = require('cors');

            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();