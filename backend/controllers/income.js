const IncomeSchema = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
    let { amount, date, category, customCategory } = req.body;
    
    amount = Number(amount);

    try {
        if (!amount || !date || !category || (category === 'other' && !customCategory)) {
            console.error('Validation error: Missing fields', { amount, date, category, customCategory });
            return res.status(400).json({ message: 'All required fields must be provided' });
        }
        
        if (isNaN(amount) || amount <= 0) {
            console.error('Validation error: Invalid amount', amount);
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
        console.error('Server error:', error.message);
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



exports.getIncomes = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const incomes = await IncomeSchema.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const result = await IncomeSchema.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete income' });
    }
};

