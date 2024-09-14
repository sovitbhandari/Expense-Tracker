const mongoose = require('mongoose');

// Define the schema for expense
const expenseSchema = new mongoose.Schema({
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
        required: true,
    }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
