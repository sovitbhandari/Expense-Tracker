const IncomeSchema = require('../models/IncomeModel');

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        return res.status(200).json(incomes);
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


exports.addIncome = async (req, res) => {
    let { amount, date, category, customCategory } = req.body;

    amount = Number(amount);

    try {
        if (!amount || !date || !category || (category === 'other' && !customCategory)) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number' });
        }

        const income = new IncomeSchema({
            amount,
            date,
            category: category === 'other' ? customCategory : category
        });

        await income.save();
        return res.status(200).json({ message: 'Income Added' });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await IncomeSchema.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete income' });
    }
};
