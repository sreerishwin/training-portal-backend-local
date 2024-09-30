import "reflect-metadata"; 
import express from 'express';
import { connectDB } from './config/database';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes); // Mount user routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});