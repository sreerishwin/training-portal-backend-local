import { DataSource } from 'typeorm';
import { User } from '../models/User';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'user',
    entities: [User],
    synchronize: true, // Caution: Don't use in production
});

const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('MySQL Connected');
    } catch (error:any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export { connectDB, AppDataSource };