import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const authReducer = createReducer( initialState, (builder) => {
    builder
        // Login Cases
        .addCase('loginRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('loginSuccess', (state, action) => {
            state.loadingA = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase('loginFailure', (state,action) => {
            state.loadingA = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })

        // Register Cases
        .addCase('registerRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('registerSuccess', (state, action) => {
            state.loadingA = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        })
        .addCase('registerFailure', (state,action) => {
            state.loadingA = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })


        // Verification Cases
        .addCase('verificationRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('verificationSuccess', (state, action) => {
            state.loadingA = false;
            state.message = action.payload.message;
        })
        .addCase('verificationFailure', (state,action) => {
            state.loadingA = false;
            state.error = action.payload;
        })


        // Forgot Password Cases
        .addCase('forgotPasswordRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('forgotPasswordSuccess', (state, action) => {
            state.loadingA = false;
            state.message = action.payload.message;
        })
        .addCase('forgotPasswordFailure', (state,action) => {
            state.loadingA = false;
            state.error = action.payload;
        })

        // Reset Password Cases
        .addCase('resetPasswordRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('resetPasswordSuccess', (state, action) => {
            state.loadingA = false;
            state.message = action.payload.message;
        })
        .addCase('resetPasswordFailure', (state,action) => {
            state.loadingA = false;
            state.error = action.payload;
        })

        // Change Password Cases
        .addCase('changePasswordRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('changePasswordSuccess', (state, action) => {
            state.loadingA = false;
            state.isAuthenticated = false;
            state.message = action.payload.message;
        })
        .addCase('changePasswordFailure', (state,action) => {
            state.loadingA = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        })

        // Update Profile Cases
        .addCase('updateProfileRequest', (state) => {
            state.loadingA= true;
        })
        .addCase('updateProfileSuccess', (state, action) => {
            state.loadingA = false;
            state.message = action.payload.message;
        })
        .addCase('updateProfileFailure', (state,action) => {
            state.loadingA = false;
            state.error = action.payload;
        })

        // Logout Cases
        .addCase('logoutRequest', (state) => {
            state.loadingA = true;
        })
        .addCase('logoutSuccess', (state, action) => {
            state.loadingA = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload.message;
        })
        .addCase('logoutFailure', (state,action) => {
            state.loadingA = false;
            state.isAuthenticated = true;
            state.error = action.payload;
        })

        // Load userData
        .addCase('loadUserRequest', (state) => {
            state.loadingA = true;
        })
        .addCase('loadUserSuccess', (state, action) => {
            state.loadingA = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase('loadUserFailure', (state,action) => {
            state.loadingA = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })

        //Get ALl Chefs
        .addCase('getChefsRequest', (state) => {
            state.loadingA = true;
        })
        .addCase('getChefsSuccess', (state, action) => {
            state.loadingA = false;
            state.chefs = action.payload;
        })
        .addCase('getChefsFailure', (state,action) => {
            state.loadingA = false;
            state.error = action.payload;
        })

        // Clear Error and Message
        .addCase('clearError', (state) => {
            state.error = null;
        }) 
        .addCase('clearMessage', (state) => {
            state.message = null;
        }) 
    }
)