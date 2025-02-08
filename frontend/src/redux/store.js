import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import incomeReducer from './reducers/incomeReducer';
import expenseReducer from './reducers/expenseReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        income: incomeReducer,
        expenses: expenseReducer
    }
});

export default store;
