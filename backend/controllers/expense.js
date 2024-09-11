const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    let { amount, date, category, customCategory } = req.body;

    amount = Number(amount);

    try {
        if (!amount || !date || !category || (category === 'other' && !customCategory)) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        const expense = new ExpenseSchema({
            amount,
            date,
            category: category === 'other' ? customCategory : category
        });

        await expense.save();
        return res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ExpenseSchema.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
