import express from 'express';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, '.env') });
}

import User from './models/User.js';
import auth from './middleware/auth.js';
import Resume from './models/Resume.js';

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Health Check (No DB) - Place BEFORE DB Middleware
app.get('/api/health', (req, res) => {
    console.log("Health check called");
    console.log("MONGODB_URI defined:", !!process.env.MONGODB_URI);
    if (process.env.MONGODB_URI) {
        console.log("MONGODB_URI starts with:", process.env.MONGODB_URI.substring(0, 15));
    }
    res.status(200).send('OK');
});

// Connect to DB for every request (cached)
// app.use(async (req, res, next) => {
//     // Skip DB connection for health check if it falls through (though it shouldn't)
//     if (req.path === '/api/health') return next();

//     try {
//         console.log("Attempting DB connection...");
//         await connectDB();
//         console.log("DB Connected");
//         next();
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         res.status(500).json({ message: 'Database connection failed', error: error.message });
//     }
// });

// Auth Routes
// app.post('/api/auth/register', async (req, res) => { ... });
// ... (Commented out for debugging)

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Routes commented out to isolate crash
/*
app.post('/api/auth/register', async (req, res) => { ... });
app.post('/api/auth/login', async (req, res) => { ... });
app.post('/api/resumes', auth, async (req, res) => { ... });
app.get('/api/resumes', auth, async (req, res) => { ... });
app.get('/api/resumes/:id', auth, async (req, res) => { ... });
app.get('/api/public/resumes/:id', async (req, res) => { ... });
app.put('/api/resumes/:id', auth, async (req, res) => { ... });
app.delete('/api/resumes/:id', auth, async (req, res) => { ... });
*/

// Only listen if executed directly
import { realpathSync } from 'fs';
const isMainModule = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
