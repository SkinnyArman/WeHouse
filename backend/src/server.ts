import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import roomRoutes from './routes/room.routes';
import bannedCustomerRoutes from './routes/bannedCustomer.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/rooms', roomRoutes);
app.use('/api/banned-customers', bannedCustomerRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to WeHouse API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 