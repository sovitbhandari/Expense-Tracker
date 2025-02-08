import { configureStore } from '@reduxjs/toolkit';
import incomeReducer from './reducers/incomeReducer';
import expenseReducer from './reducers/expenseReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    user: userReducer
  }
});

export default store;
