const Expense = require('../models/ExpenseModel');

// Add a new expense
exports.addExpense = async (req, res) => {
    try {
        const { amount, category, date } = req.body;

        
        const expense = new Expense({
            user: req.user.id,  
            amount,
            category,
            date
        });

        await expense.save();  
        res.status(201).json(expense);  
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get expenses with pagination
exports.getExpenses = async (req, res) => {
    const page = Number(req.query.page) || 1; 
    const pageSize = Number(req.query.pageSize) || 10; 
    const skip = (page - 1) * pageSize;  

    try {
        
        const totalExpenses = await Expense.countDocuments({ user: req.user.id });

        
        const expenses = await Expense.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)  
            .limit(pageSize);  

        // Respond with paginated expenses and pagination details
        res.status(200).json({
            expenses,
            page,
            pageSize,
            totalExpenses,
            totalPages: Math.ceil(totalExpenses / pageSize)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete an expense by ID for the authenticated user
exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

 
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }


        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this expense' });
        }


        await expense.remove();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete expense', error: error.message });
    }
};
