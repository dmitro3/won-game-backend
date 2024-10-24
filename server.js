const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const verify = require('./milddleware/jwt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

const router = require('./routes');
app.use('/api', verify, router);
app.use('/api_token', (req, res) => {
    let telegramId = req.params.id;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: telegramId,
    }

    const token = jwt.sign(data, jwtSecretKey);
    res.json({token});
});

app.get('/version', (req, res) => {
    res.send("API Version : 101801");
});

app.get('*', (req, res) => {
    res.json({
        message: 'API is running...',
        mongoStatus: 'MongoDB connected!',
        environment: process.env.NODE_ENV || 'development',
        frontendURL: `http://localhost:5173`,
    });
});

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Frontend is running on http://localhost:5173`);
        console.log('========================');
        console.log('All services are up and running!');
        console.log('========================');
    });
};

startServer();
