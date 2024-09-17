import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";

// Define the base URL for the API
const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

// Create a context for global state management
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [tempIncomes, setTempIncomes] = useState([]);  // Temporary incomes for non-authenticated users
    const [tempExpenses, setTempExpenses] = useState([]); // Temporary expenses for non-authenticated users
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    // Get user preferences from localStorage if they exist
    const getUserPreferencesFromStorage = () => {
        const savedPreferences = localStorage.getItem('userPreferences');
        return savedPreferences ? JSON.parse(savedPreferences) : { name: 'User', avatar: 'male' };
    };

    // State for user preferences (name and avatar)
    const [userPreferences, setUserPreferences] = useState(getUserPreferencesFromStorage);

    useEffect(() => {
        // Save the preferences in localStorage whenever they change
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    }, [userPreferences]);

    // Clear temporary data on refresh if the user is not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            setTempIncomes([]);  // Clear temp incomes on refresh
            setTempExpenses([]); // Clear temp expenses on refresh
        }
    }, [isAuthenticated]);

    // Sign In Function
    const signIn = async (userData) => {
        try {
            const { data } = await axios.post(`${BASE_URL}signin`, userData);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userPreferences', JSON.stringify({ name: data.user.name, avatar: data.user.avatar }));
            setUserPreferences({ name: data.user.name, avatar: data.user.avatar });
            setIsAuthenticated(true);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error during sign-in');
            return false;
        }
    };

    // Sign Up Function
    const signUp = async (userData) => {
        try {
            const { data } = await axios.post(`${BASE_URL}signup`, userData);
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userPreferences', JSON.stringify({ name: userData.name, avatar: userData.avatar }));
            setUserPreferences({ name: userData.name, avatar: userData.avatar });
            setIsAuthenticated(true);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error during sign-up');
            return false;
        }
    };

    // Sign Out Function
    const signOut = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        localStorage.setItem('userPreferences', JSON.stringify({ name: 'User', avatar: 'male' }));
        setUserPreferences({ name: 'User', avatar: 'male' });
    };

    // Update Profile Function
    const updateProfile = async (profileData) => {
        try {
            const { data } = await axios.put(`${BASE_URL}update-profile`, profileData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            localStorage.setItem('userPreferences', JSON.stringify({ name: data.name, avatar: data.avatar }));
            setUserPreferences({ name: data.name, avatar: data.avatar });
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating profile');
            return false;
        }
    };

    // Add Income (with temporary storage for non-authenticated users)
    const addIncome = async (income) => {
        const formattedIncome = { ...income, amount: Number(income.amount), createdAt: new Date() };  // Add createdAt field
        if (!isAuthenticated) {
            setTempIncomes([...tempIncomes, { ...formattedIncome, id: Date.now() }]); // Temporarily store income
            return;
        }
        try {
            await axios.post(`${BASE_URL}add-income`, income, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            fetchIncomes(); 
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };
    

    // Fetch Incomes
    const fetchIncomes = async () => {
        if (!isAuthenticated) {
            setIncomes(tempIncomes);  // Use temporary incomes if not authenticated
            return;
        }
        try {
            const { data } = await axios.get(`${BASE_URL}get-incomes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const incomesWithType = data.map(income => ({ ...income, type: 'income' }));
            setIncomes(incomesWithType);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Remove Income (for both authenticated and unauthenticated users)
    const removeIncome = async (id) => {
        if (!isAuthenticated) {
            setTempIncomes(tempIncomes.filter(income => income.id !== id)); // Remove from temporary incomes
            return;
        }
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            fetchIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Add Expense (with temporary storage for non-authenticated users)
    const addExpense = async (expense) => {
        const formattedExpense = { ...expense, amount: Number(expense.amount), createdAt: new Date() };  // Add createdAt field
        if (!isAuthenticated) {
            setTempExpenses([...tempExpenses, { ...formattedExpense, id: Date.now() }]); // Temporarily store expense
            return;
        }
        try {
            await axios.post(`${BASE_URL}add-expense`, expense, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            fetchExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Fetch Expenses
    const fetchExpenses = async () => {
        if (!isAuthenticated) {
            setExpenses(tempExpenses);  // Use temporary expenses if not authenticated
            return;
        }
        try {
            const { data } = await axios.get(`${BASE_URL}get-expenses`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const expensesWithType = data.map(expense => ({ ...expense, type: 'expense' }));
            setExpenses(expensesWithType);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Remove Expense (for both authenticated and unauthenticated users)
    const removeExpense = async (id) => {
        if (!isAuthenticated) {
            setTempExpenses(tempExpenses.filter(expense => expense.id !== id)); // Remove from temporary expenses
            return;
        }
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            fetchExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const calculateTotalIncome = () => incomes.reduce((total, income) => total + income.amount, 0);

    const calculateTotalExpenses = () => expenses.reduce((total, expense) => total + expense.amount, 0);

    const calculateTotalBalance = () => calculateTotalIncome() - calculateTotalExpenses();

    const recentTransactions = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        return history.slice(0, 3);
    };
    

    // Function to update user preferences and store them
    const updateUserPreferences = (newPreferences) => {
        setUserPreferences((prev) => ({
            ...prev,
            ...newPreferences
        }));
    };

    return (
        <GlobalContext.Provider value={{
            incomes,
            expenses,
            tempIncomes,
            tempExpenses,
            setIncomes,
            setExpenses,
            addIncome,
            fetchIncomes,
            removeIncome,
            addExpense,
            fetchExpenses,
            removeExpense,
            calculateTotalIncome,
            calculateTotalExpenses,
            calculateTotalBalance,
            recentTransactions,
            userPreferences,
            updateUserPreferences,
            updateProfile, 
            error,
            setError,
            signIn,
            signUp,
            signOut,
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
