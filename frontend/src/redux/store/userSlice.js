import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1/";

export const signIn = createAsyncThunk('user/signIn', async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(`${BASE_URL}signin`, userData);
    localStorage.setItem('authToken', data.token);
    return data.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error signing in');
  }
});

export const signOut = createAsyncThunk('user/signOut', async () => {
  localStorage.removeItem('authToken');
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default userSlice.reducer;
