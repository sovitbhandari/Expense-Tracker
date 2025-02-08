import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

// Async action to fetch incomes
export const fetchIncomes = createAsyncThunk(
  'income/fetchIncomes',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-incomes`);
      return Array.isArray(data) ? data : []; // Ensure data is an array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch incomes');
    }
  }
);

const incomeSlice = createSlice({
  name: 'income',
  initialState: {
    incomes: [],
    totalIncome: 0, // Added totalIncome field
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
        state.totalIncome = action.payload.reduce((acc, income) => acc + (income.amount || 0), 0); // Compute total income
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default incomeSlice.reducer;
