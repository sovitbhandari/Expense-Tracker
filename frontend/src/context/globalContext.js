import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:3001/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Add Income
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            console.log('Income added:', response.data); // Use response data
            getIncomes(); // Refresh the list of incomes
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Get Incomes
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
            setIncomes(response.data);
            console.log('Incomes fetched:', response.data); // Use response data
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Delete Income
    const deleteIncome = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
            console.log('Income deleted:', res.data); // Use res data
            getIncomes(); // Refresh the list of incomes
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Calculate Total Income
    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    // Add Expense
    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, expense);
            console.log('Expense added:', response.data); // Use response data
            getExpenses(); // Refresh the list of expenses
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Get Expenses
    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`);
            setExpenses(response.data);
            console.log('Expenses fetched:', response.data); // Use response data
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Delete Expense
    const deleteExpense = async (id) => {
        try {
            const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
            console.log('Expense deleted:', res.data); // Use res data
            getExpenses(); // Refresh the list of expenses
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    // Calculate Total Expenses
    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    // Calculate Total Balance
    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    // Get Transaction History
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
