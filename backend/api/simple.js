export default function handler(req, res) {
    res.status(200).json({
        message: 'Simple API is working!',
        node_version: process.version,
        env_check: !!process.env.MONGODB_URI
    });
}
