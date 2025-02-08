import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

// Fetch Incomes
export const fetchIncomes = createAsyncThunk('income/fetchIncomes', async () => {
  const response = await axios.get(`${BASE_URL}get-incomes`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  });
  return response.data;
});

const incomeSlice = createSlice({
  name: 'income',
  initialState: { incomes: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => { state.loading = true; })
      .addCase(fetchIncomes.fulfilled, (state, action) => { state.loading = false; state.incomes = action.payload; })
      .addCase(fetchIncomes.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  }
});

export default incomeSlice.reducer;
