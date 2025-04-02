import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Create a promise that resolves when the connection is ready
let connectionPromise: Promise<typeof mongoose>;

beforeAll(async () => {
  try {
    console.log('Starting test setup...');
    const mongoUri = process.env.MONGODB_TEST_URI;
    console.log('Connecting to MongoDB test database...');
    
    // Configure Mongoose settings
    mongoose.set('maxTimeMS', 30000); // 30 seconds timeout for operations
    
    // Create the connection promise
    connectionPromise = mongoose.connect(mongoUri!, {
      serverSelectionTimeoutMS: 60000, // 1 minute
      socketTimeoutMS: 45000, // 45 seconds
      connectTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      retryReads: true,
      w: 'majority',
      maxIdleTimeMS: 60000, // 1 minute
      heartbeatFrequencyMS: 10000, // 10 seconds
      family: 4 // Use IPv4, skip trying IPv6
    });
    
    // Wait for the connection to be established
    await connectionPromise;
    console.log('Successfully connected to MongoDB test database');
    
    // Only disable buffering after connection is established
    mongoose.set('bufferCommands', false);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}, 70000); // 70 seconds timeout for beforeAll

beforeEach(async () => {
  try {
    // Ensure connection is established
    await connectionPromise;
    
    console.log('Cleaning up test database...');
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    const collections = await db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
    console.log('Test database cleanup completed');
  } catch (error) {
    console.error('Error cleaning up test database:', error);
    throw error;
  }
}, 30000); // 30 seconds timeout for beforeEach

afterAll(async () => {
  try {
    console.log('Closing MongoDB connection...');
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}, 30000); // 30 seconds timeout for afterAll 