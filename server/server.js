const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Fallback for dev

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Auth Routes

// Register
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Resume Routes
const auth = require('./middleware/auth');
const Resume = require('./models/Resume');

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
        res.status(500).send('Server Error');
    }
});

// Get All Resumes for User
app.get('/api/resumes', auth, async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.userId }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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
        res.status(500).send('Server Error');
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
        res.status(500).send('Server Error');
    }
});

// Update Resume
app.put('/api/resumes/:id', auth, async (req, res) => {
    try {
        const { title, ...resumeData } = req.body;

        let resume = await Resume.findOne({ resumeId: req.params.id, userId: req.user.userId });

        if (!resume) {
            // If not found, create it (upsert-like behavior for initial save)
            const newResume = new Resume({
                userId: req.user.userId,
                resumeId: req.params.id,
                title: title || 'Untitled Resume',
                ...resumeData
            });
            resume = await newResume.save();
            return res.json(resume);
        }

        // Update fields
        if (title) resume.title = title;
        Object.assign(resume, resumeData);

        await resume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
