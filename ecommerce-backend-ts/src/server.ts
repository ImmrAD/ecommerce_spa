import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To accept JSON data in the body

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
// Note: Cart APIs are not included as the original request was to persist cart on the frontend.
// If you needed backend cart persistence, you would add protected cart routes here.

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));