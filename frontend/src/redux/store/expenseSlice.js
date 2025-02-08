import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

// **📌 Async Actions for Expenses**

// **Fetch Expenses**
export const fetchExpenses = createAsyncThunk('expense/fetchExpenses', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`${BASE_URL}get-expenses`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch expenses');
    }
});

// **Add Expense**
export const addExpense = createAsyncThunk('expense/addExpense', async (expense, thunkAPI) => {
    try {
        const { data } = await axios.post(`${BASE_URL}add-expense`, expense);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add expense');
    }
});

// **Remove Expense**
export const removeExpense = createAsyncThunk('expense/removeExpense', async (id, thunkAPI) => {
    try {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete expense');
    }
});

// **Expense Slice**
const expenseSlice = createSlice({
    name: 'expense',
    initialState: { expenses: [], totalExpenses: 0, loading: false, error: null },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // **Fetch Expenses Cases**
            .addCase(fetchExpenses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = action.payload;
                state.totalExpenses = action.payload.reduce((total, expense) => total + expense.amount, 0);
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // **Add Expense Cases**
            .addCase(addExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses.push(action.payload);
                state.totalExpenses += action.payload.amount;
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // **Remove Expense Cases**
            .addCase(removeExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeExpense.fulfilled, (state, action) => {
                state.loading = false;
                state.expenses = state.expenses.filter(expense => expense._id !== action.payload);
                state.totalExpenses = state.expenses.reduce((total, expense) => total + expense.amount, 0);
            })
            .addCase(removeExpense.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default expenseSlice.reducer;
