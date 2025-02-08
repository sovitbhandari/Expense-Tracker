import axios from 'axios';
import { setIncomes, addIncome, removeIncome } from '../reducers/incomeReducer';

const BASE_URL = "https://expense-tracker-backend-p7b5.onrender.com/api/v1";

export const fetchIncomes = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/get-incomes`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch(setIncomes(data));
    } catch (error) {
        console.error('Error fetching incomes:', error);
    }
};

export const createIncome = (income) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/add-income`, income, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch(addIncome(data));
    } catch (error) {
        console.error('Error adding income:', error);
    }
};

export const deleteIncome = (id) => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/delete-income/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        dispatch(removeIncome(id));
    } catch (error) {
        console.error('Error deleting income:', error);
    }
};

