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
app.use(async (req, res, next) => {
    // Skip DB connection for health check if it falls through (though it shouldn't)
    if (req.path === '/api/health') return next();

    try {
        console.log("Attempting DB connection...");
        await connectDB();
        console.log("DB Connected");
        next();
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Auth Routes

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Create Resume
app.post('/api/resumes', auth, async (req, res) => {
    try {
        const { resumeId, title, ...resumeData } = req.body;

        const newResume = new Resume({
            userId: req.user.userId,
            resumeId,
            title,
            ...resumeData
        });

        const resume = await newResume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get All Resumes for User
app.get('/api/resumes', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.userId }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get Specific Resume
app.get('/api/resumes/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOne({ resumeId: req.params.id, userId: req.user.userId });

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get Public Resume (No Auth)
app.get('/api/public/resumes/:id', async (req, res) => {
    try {
        const resume = await Resume.findOne({ resumeId: req.params.id });

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Update Resume
app.put('/api/resumes/:id', auth, async (req, res) => {
    try {
        const { title, ...resumeData } = req.body;

        let resume = await Resume.findOne({ resumeId: req.params.id, userId: req.user.userId });

        if (!resume) {
            const newResume = new Resume({
                userId: req.user.userId,
                resumeId: req.params.id,
                title: title || 'Untitled Resume',
                ...resumeData
            });
            resume = await newResume.save();
            return res.json(resume);
        }

        if (title) resume.title = title;
        Object.assign(resume, resumeData);

        await resume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Delete Resume
app.delete('/api/resumes/:id', auth, async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete({ resumeId: req.params.id, userId: req.user.userId });

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        res.json({ msg: 'Resume removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Only listen if executed directly and NOT in production (Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
