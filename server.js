import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import sampleRoutes from './routes/sampleRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const nav_url = process.env.FRONTEND_URL || 'http://localhost:4000';

//Middleware
app.use(cors({
  origin: nav_url,
  // origin: process.env.FRONTEND_URL || 'http://localhost:4000', // or your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); //Parse incoming JSON requests

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Serve frontend files from "public" folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Health check route first
app.get("/", (req, res) => {
  res.status(200).send('✅ API is working');
});

// Backend API Routes
app.use('/', sampleRoutes);

export default app;