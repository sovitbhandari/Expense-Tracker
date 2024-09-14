const mongoose = require('mongoose');

// Define the schema for income
const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
