const mongoose = require('mongoose');

const db = async () => {
    try {
        // No need for useNewUrlParser and useUnifiedTopology in Mongoose 6+
        await mongoose.connect('mongodb://localhost:27017/finance-db');
        
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
    }
};

module.exports = { db };
