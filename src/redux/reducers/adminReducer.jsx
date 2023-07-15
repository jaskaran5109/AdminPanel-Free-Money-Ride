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
            state.appUserloading = true;
        },
        getAllAppUsersSuccess: (state, action) => {
            state.appUserloading = false;
            state.user = action.payload;
        },
        getAllAppUsersFail: (state, action) => {
            state.appUserloading = false;
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
            state.offerloading = true;
        },
        getAllOfferSuccess: (state, action) => {
            state.offerloading = false;
            state.offers = action.payload;
        },
        getAllOfferFail: (state, action) => {
            state.offerloading = false;
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

        loadUserReportRequest: (state) => {
            state.loading = true;
        },
        loadUserReportSuccess: (state, action) => {
            state.loading = false;
            state.reports = action.payload;
        },
        loadUserReportFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },


        sendNotificationRequest: (state) => {
            state.loading = true;
        },
        sendNotificationSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        sendNotificationFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
);