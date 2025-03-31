import express, { Express } from 'express';
import { connectDB } from './config/database';
import roomRoutes from './routes/room.routes';

const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/rooms', roomRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to WeHouse API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 