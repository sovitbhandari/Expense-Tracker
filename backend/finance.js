require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Middlewares
app.use(express.json());
app.use(cors());

// Dynamic route loading
fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
    if (file.endsWith('.js')) {
        const routePath = path.join(__dirname, 'routes', file);
        const route = require(routePath);
        app.use(`/api/v1/${file.replace('.js', '')}`, route);
    }
});

// Server initialization
const startServer = () => {
    db(); // Ensure this function connects to your database
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

startServer();
