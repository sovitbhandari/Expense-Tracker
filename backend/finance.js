const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const financeRoutes = require('./routes/financeRoutes');  // Import the income/expense routes

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON request bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/financeDB', {
})
.then(() => console.log('DB Connected'))
.catch((err) => console.log('DB Connection Error:', err));

// Routes
app.use('/api/v1', financeRoutes); // Mount the routes under /api/v1

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
