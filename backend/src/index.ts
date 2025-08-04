 import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/db';
import collegeRoutes from './routes/college.route'; // <-- 1. IMPORT the router

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  // MIDDLEWARE to parse JSON bodies
  app.use(express.json()); // <-- 2. ADD this middleware

  app.get('/', (req: Request, res: Response) => {
    res.send('API is running successfully!');
  });

  // Use the college routes
  app.use('/api/colleges', collegeRoutes); // <-- 3. USE the router

  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
  });
};

startServer();