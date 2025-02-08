import axios from 'axios';
import { setExpenses, addExpense, removeExpense } from '../reducers/expenseReducer';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1";

export const fetchExpenses = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/get-expenses`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch(setExpenses(data));
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
};

export const createExpense = (expense) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/add-expense`, expense, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch(addExpense(data));
    } catch (error) {
        console.error('Error adding expense:', error);
    }
};

export const deleteExpense = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/delete-expense/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch(removeExpense(id));
    } catch (error) {
        console.error('Error deleting expense:', error);
    }
};
