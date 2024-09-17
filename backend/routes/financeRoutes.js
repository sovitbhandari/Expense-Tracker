const express = require('express');
const mongoose = require('mongoose');  // Import mongoose to validate ObjectIds
const router = express.Router();
const Income = require('../models/IncomeModel');  // Import the Income model
const Expense = require('../models/ExpenseModel'); // Import the Expense model
const { protect } = require('../middleware/authMiddleware');  // Import auth middleware

// Route to get all incomes for authenticated user
router.get('/get-incomes', protect, async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.user.id }); // Fetch incomes for the logged-in user
        res.status(200).json(incomes);       // Send the data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incomes', error: error.message });
    }
});

// Route to add an income for authenticated user
router.post('/add-income', protect, async (req, res) => {
    const { amount, category, description, date } = req.body;  // Accept date from request body

    if (!amount || !category) {  // Basic validation
        return res.status(400).json({ message: 'Amount and category are required' });
    }

    try {
        const newIncome = new Income({
            user: req.user.id, // Attach the logged-in user to the income
            amount,
            category,
            description,
            date: date ? new Date(date) : new Date()  // Use provided date or default to the current date
        });
        await newIncome.save();              // Save to the database
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: 'Error adding income', error: error.message });
    }
});

// Route to delete an income by ID for authenticated user
router.delete('/delete-income/:id', protect, async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid income ID' });
    }

    try {
        // Find the income and ensure it belongs to the authenticated user
        const deletedIncome = await Income.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting income', error: error.message });
    }
});

// Route to get all expenses for authenticated user
router.get('/get-expenses', protect, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id });  // Fetch expenses for the logged-in user
        res.status(200).json(expenses);         // Send the data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
});

// Route to add an expense for authenticated user
router.post('/add-expense', protect, async (req, res) => {
    const { amount, category, description, date } = req.body;  // Accept date from request body

    if (!amount || !category) {  // Basic validation
        return res.status(400).json({ message: 'Amount and category are required' });
    }

    try {
        const newExpense = new Expense({
            user: req.user.id, // Attach the logged-in user to the expense
            amount,
            category,
            description,
            date: date ? new Date(date) : new Date()  // Use provided date or default to the current date
        });
        await newExpense.save();                // Save to the database
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
});

// Route to delete an expense by ID for authenticated user
router.delete('/delete-expense/:id', protect, async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid expense ID' });
    }

    try {
        // Find the expense and ensure it belongs to the authenticated user
        const deletedExpense = await Expense.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
});

module.exports = router;
