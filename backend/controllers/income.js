const Income = require('../models/IncomeModel');

// Add new income
exports.addIncome = async (req, res) => {
    try {
        const { amount, category, date } = req.body;


        const income = new Income({
            user: req.user.id,  
            amount,
            category,
            date
        });

        await income.save();  
        res.status(201).json(income); 
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get incomes (with pagination and optimized queries)
exports.getIncomes = async (req, res) => {
    const page = Number(req.query.page) || 1; 
    const pageSize = Number(req.query.pageSize) || 10; 
    const skip = (page - 1) * pageSize;  

    try {
        const [totalIncomes, incomes] = await Promise.all([
            Income.countDocuments({ user: req.user.id }),
            Income.find({ user: req.user.id })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageSize)
                .lean() 
        ]);

        // Respond with paginated income data
        res.status(200).json({
            incomes,
            page,
            pageSize,
            totalIncomes,
            totalPages: Math.ceil(totalIncomes / pageSize),
            responseTime: Date.now() - req.startTime 
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete an income by ID
exports.deleteIncome = async (req, res) => {
    try {
        const { id } = req.params;

        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }


        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this income' });
        }

        // Remove the income record
        await income.remove();
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete income', error: error.message });
    }
};
