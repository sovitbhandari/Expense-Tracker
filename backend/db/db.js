require('dotenv').config();
const mongoose = require('mongoose');

const db = async () => {
    try {
        // No need for useNewUrlParser and useUnifiedTopology in Mongoose 6+
        await mongoose.connect('process.env.MNG_DB');
        
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
    }
};

module.exports = { db };
