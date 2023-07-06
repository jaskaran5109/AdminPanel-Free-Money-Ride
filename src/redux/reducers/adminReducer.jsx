import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
    {},
    {
        getAllUsersRequest: state => {
            state.loading = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        getAllUsersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getAllAppUsersRequest: state => {
            state.loading = true;
        },
        getAllAppUsersSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        getAllAppUsersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserRequest: state => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        deleteUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserRoleRequest: state => {
            state.loading = true;
        },
        updateUserRoleSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        updateUserRoleFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        getAllOfferRequest: state => {
            state.loading = true;
        },
        getAllOfferSuccess: (state, action) => {
            state.loading = false;
            state.offers = action.payload;
        },
        getAllOfferFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateOfferRequest: state => {
            state.loading = true;
        },
        updateOfferSuccess: (state, action) => {
            state.loading = false;
            state.offer = action.payload;
        },
        updateOfferFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearError: state => {
            state.error = null;
        },
        clearMessage: state => {
            state.message = null;
        },
    }
);