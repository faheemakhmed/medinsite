import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  // Retrieve the database URI from environment variables
  const dbUri = process.env.DATABASE_URI;

  if (!dbUri) {
    console.error("Error: DATABASE_URI is not defined in the .env file");
    process.exit(1); // Exit the process with a failure code
  }

  try {
    // Attempt to connect to the database
    await mongoose.connect(dbUri);
    console.log("✅ Successfully connected to MongoDB!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process on connection failure
  }
};

export default connectDB;