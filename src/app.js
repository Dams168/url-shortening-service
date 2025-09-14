import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

// Database connection 
mongoose.connect('mongodb://127.0.0.1/urlShort')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connecting to MongoDB', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortening Service!');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});