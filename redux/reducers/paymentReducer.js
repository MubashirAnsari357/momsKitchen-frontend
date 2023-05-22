import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const paymentReducer = createReducer( initialState, (builder) => {
    builder

        .addCase('paymentVerificationRequest', (state) => {
            state.loadingP = true;
        })
        .addCase('paymentVerificationSuccess', (state, action) => {
            state.loadingP = false;
            state.paymentStatus = action.payload.success;
        })
        .addCase('paymentVerificationFailure', (state,action) => {
            state.loadingP = false;
            state.error = action.payload;
        })

        // Clear Error and Message

        .addCase('clearError', (state) => {
            state.error = null;
        }) 
        .addCase('clearStatus', (state) => {
            state.paymentStatus = null;
        }) 
    }
)