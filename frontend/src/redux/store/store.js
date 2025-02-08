import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './incomeSlice';
import expenseReducer from './expenseSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    user: userReducer,
  }
});

export default store;
