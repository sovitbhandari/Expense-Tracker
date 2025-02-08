import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

// Async actions
export const fetchIncomes = createAsyncThunk('income/fetchIncomes', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get(`${BASE_URL}get-incomes`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch incomes');
  }
});

const incomeSlice = createSlice({
  name: 'income',
  initialState: { incomes: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default incomeSlice.reducer;
