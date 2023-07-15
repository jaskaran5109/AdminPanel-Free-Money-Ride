import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer(
    {},
    {
        loginRequest: state => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        registerRequest: state => {
            state.loading = true;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        registerFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        logoutRequest: state => {
            state.loading = true;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        },

        loadUserRequest: state => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        clearError: state => {
            state.error = null;
        },
        clearMessage: state => {
            state.message = null;
        },

        resetPasswordRequest: state => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        resetPasswordFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        totalEarningsRequest: state => {
            state.loading = true;
        },
        totalEarningsSuccess: (state, action) => {
            state.loading = false;
            state.earnings = action.payload.totalEarnings;
        },
        totalEarningsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        totalAmountLeftRequest: state => {
            state.loading = true;
        },
        totalAmountLeftSuccess: (state, action) => {
            state.loading = false;
            state.amounts = action.payload.totalAmount;
        },
        totalAmountLeftFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        earningsForTheDayRequest: state => {
            state.loading = true;
        },
        earningsForTheDaySuccess: (state, action) => {
            state.loading = false;
            state.dayEarnings = action.payload.totalEarnings;
            state.message = action.payload.message
        },
        earningsForTheDayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);
