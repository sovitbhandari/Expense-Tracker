import { createSlice } from '@reduxjs/toolkit';

const incomeSlice = createSlice({
    name: 'income',
    initialState: [],
    reducers: {
        setIncomes: (state, action) => action.payload,
        addIncome: (state, action) => [...state, action.payload],
        removeIncome: (state, action) => state.filter(income => income.id !== action.payload),
    }
});

export const { setIncomes, addIncome, removeIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
