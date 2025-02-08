import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: !!localStorage.getItem('authToken'),
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('authToken', action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('authToken');
        },
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
