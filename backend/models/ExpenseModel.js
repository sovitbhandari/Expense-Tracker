const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
        required: true
    },
    createdAt: {
        type: Date,
    },
});

ExpenseSchema.index({ user: 1, createdAt: -1 });
const Expense = mongoose.model('Expense', ExpenseSchema);
module.exports = Expense;
