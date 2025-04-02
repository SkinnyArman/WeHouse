import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    const mongoUri = process.env.MONGODB_URI_TEST;
    console.log('Attempting to connect to:', mongoUri);
    
    await mongoose.connect(mongoUri!);
    console.log('Successfully connected to MongoDB test database');
    
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    process.exit();
  }
}

testConnection(); 