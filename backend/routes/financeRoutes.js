const express = require('express');
const mongoose = require('mongoose');  // Import mongoose to validate ObjectIds
const router = express.Router();
const Income = require('../models/IncomeModel');  // Import the Income model
const Expense = require('../models/ExpenseModel'); // Import the Expense model

// Route to get all incomes
router.get('/get-incomes', async (req, res) => {
    try {
        const incomes = await Income.find(); // Fetch all incomes
        res.status(200).json(incomes);       // Send the data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching incomes', error: error.message });
    }
});

// Route to add an income
router.post('/add-income', async (req, res) => {
    const { amount, category, description, date } = req.body;  // Accept date from request body

    if (!amount || !category) {  // Basic validation
        return res.status(400).json({ message: 'Amount and category are required' });
    }

    try {
        const newIncome = new Income({
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

// Route to delete an income by ID
router.delete('/delete-income/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid income ID' });
    }

    try {
        const deletedIncome = await Income.findByIdAndDelete(id);
        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting income', error: error.message });
    }
});

// Route to get all expenses
router.get('/get-expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();  // Fetch all expenses
        res.status(200).json(expenses);         // Send the data
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
});

// Route to add an expense
router.post('/add-expense', async (req, res) => {
    const { amount, category, description, date } = req.body;  // Accept date from request body

    if (!amount || !category) {  // Basic validation
        return res.status(400).json({ message: 'Amount and category are required' });
    }

    try {
        const newExpense = new Expense({
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

// Route to delete an expense by ID
router.delete('/delete-expense/:id', async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid expense ID' });
    }

    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
});

module.exports = router;
