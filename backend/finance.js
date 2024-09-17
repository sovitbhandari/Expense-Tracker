require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const financeRoutes = require('./routes/financeRoutes');  

const app = express();
const PORT = process.env.PORT || 5001;
const MNG_DB = process.env.MNG_DB;  

if (!MNG_DB) {
  console.error('Error: MNG_DB environment variable is not set');
  process.exit(1);  
}

// Middleware
app.use(cors());
app.use(express.json());  

// MongoDB connection
mongoose.connect(MNG_DB, {
})
.then(() => console.log('DB Connected'))
.catch((err) => console.log('DB Connection Error:', err));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', financeRoutes); 


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
