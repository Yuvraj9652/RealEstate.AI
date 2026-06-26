import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        loginStart(state) {
            state.loading = true;
            state.error = null;
        },

        loginSuccess(state, action) {

            state.loading = false;

            state.user = action.payload.user;

            state.accessToken = action.payload.access;

            state.isAuthenticated = true;

        },

        loginFailure(state, action) {

            state.loading = false;

            state.error = action.payload;

        },

        logout(state) {

            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;

        }

    }

});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;