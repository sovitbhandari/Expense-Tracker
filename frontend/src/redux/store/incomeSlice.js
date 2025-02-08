import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

// **📌 Async Actions for Incomes**

// **Fetch Incomes**
export const fetchIncomes = createAsyncThunk('income/fetchIncomes', async (_, thunkAPI) => {
    try {
        const { data } = await axios.get(`${BASE_URL}get-incomes`);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch incomes');
    }
});

// **Add Income**
export const addIncome = createAsyncThunk('income/addIncome', async (income, thunkAPI) => {
    try {
        const { data } = await axios.post(`${BASE_URL}add-income`, income);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add income');
    }
});

// **Remove Income**
export const removeIncome = createAsyncThunk('income/removeIncome', async (id, thunkAPI) => {
    try {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete income');
    }
});

// **Income Slice**
const incomeSlice = createSlice({
    name: 'income',
    initialState: { incomes: [], totalIncome: 0, loading: false, error: null },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // **Fetch Incomes Cases**
            .addCase(fetchIncomes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchIncomes.fulfilled, (state, action) => {
                state.loading = false;
                state.incomes = action.payload;
                state.totalIncome = action.payload.reduce((total, income) => total + income.amount, 0);
            })
            .addCase(fetchIncomes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // **Add Income Cases**
            .addCase(addIncome.pending, (state) => {
                state.loading = true;
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.incomes.push(action.payload);
                state.totalIncome += action.payload.amount;
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // **Remove Income Cases**
            .addCase(removeIncome.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeIncome.fulfilled, (state, action) => {
                state.loading = false;
                state.incomes = state.incomes.filter(income => income._id !== action.payload);
                state.totalIncome = state.incomes.reduce((total, income) => total + income.amount, 0);
            })
            .addCase(removeIncome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default incomeSlice.reducer;
