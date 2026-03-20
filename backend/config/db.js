import mongoose from 'mongoose';

let isConnected = false;

async function connectDB() {
    // Return early if already connected
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log('✅ Using existing MongoDB connection');
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('❌ MONGODB_URI is missing in environment variables');
    }

    console.log('🔌 Connecting to MongoDB:', process.env.MONGODB_URI.replace(/\/\/.*@/, '//***@'));

    const opts = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, opts);
        isConnected = true;

        console.log(`✅ MongoDB Connected: ${db.connection.host}`);
        console.log(`📦 Database: ${db.connection.name}`);

        // Log connection events
        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
            isConnected = false;
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
            isConnected = true;
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
            isConnected = false;
        });

        return db.connection;
    } catch (error) {
        isConnected = false;
        console.error('❌ MongoDB connection failed:', error.message);
        throw error;
    }
}

export default connectDB;
