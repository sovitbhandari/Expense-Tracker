import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";

// Define the base URL for the API
const BASE_URL = "http://localhost:5001/api/v1/";

// Create a context for global state management
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

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

    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income);
            fetchIncomes(); 
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const fetchIncomes = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}get-incomes`);
            const incomesWithType = data.map(income => ({ ...income, type: 'income' }));
            setIncomes(incomesWithType);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const removeIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`);
            fetchIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense);
            fetchExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const fetchExpenses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}get-expenses`);
            const expensesWithType = data.map(expense => ({ ...expense, type: 'expense' }));
            setExpenses(expensesWithType);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    const removeExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`);
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
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3); // Return the latest 3 transactions
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
            setIncomes, // Pass the setter function
            setExpenses, // Pass the setter function
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
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
