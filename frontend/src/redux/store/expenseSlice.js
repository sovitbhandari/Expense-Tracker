import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

export const fetchExpenses = createAsyncThunk('expense/fetchExpenses', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${BASE_URL}get-expenses`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch expenses');
  }
});

const expenseSlice = createSlice({
  name: 'expense',
  initialState: { expenses: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default expenseSlice.reducer;
