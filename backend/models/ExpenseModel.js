// backend/models/ExpenseModel.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    customCategory: {
        type: String,
        trim: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
