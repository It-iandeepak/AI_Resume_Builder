const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    resumeId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    fullName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
    themeColor: String,
    profession: String,
    linkedin: String,
    website: String,
    leetcode: String,
    geeksforgeeks: String,
    github: String,
    summary: String,
    skills: [Object],
    experience: [Object],
    achievements: [Object],
    projects: [Object],
    education: [Object],
    certifications: [Object]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
