import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expenses',
    initialState: [],
    reducers: {
        setExpenses: (state, action) => action.payload,
        addExpense: (state, action) => [...state, action.payload],
        removeExpense: (state, action) => state.filter(expense => expense.id !== action.payload),
    }
});

export const { setExpenses, addExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
