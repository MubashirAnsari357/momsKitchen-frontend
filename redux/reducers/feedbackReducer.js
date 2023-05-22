import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const feedbackReducer = createReducer( initialState, (builder) => {
    builder
        // Add Feedback Cases
        .addCase('addFeedbackRequest', (state) => {
            state.loadingF = true;
        })
        .addCase('addFeedbackSuccess', (state, action) => {
            state.loadingF = false;
            state.message = action.payload.message;
        })
        .addCase('addFeedbackFailure', (state,action) => {
            state.loadingF = false;
            state.error = action.payload;
        })


        .addCase('updateFeedbackRequest', (state) => {
            state.loadingF = true;
        })
        .addCase('updateFeedbackSuccess', (state, action) => {
            state.loadingF = false;
            state.message = action.payload.message;
        })
        .addCase('updateFeedbackFailure', (state,action) => {
            state.loadingF = false;
            state.error = action.payload;
        })


        .addCase('getDishFeedbackRequest', (state) => {
            state.loadingF = true;
        })
        .addCase('getDishFeedbackSuccess', (state, action) => {
            state.loadingF = false;
            state.dishFeedbacks = action.payload;
        })
        .addCase('getDishFeedbackFailure', (state,action) => {
            state.loadingF = false;
            state.error = action.payload;
        })


        .addCase('getChefFeedbacksRequest', (state) => {
            state.loadingF = true;
        })
        .addCase('getChefFeedbacksSuccess', (state, action) => {
            state.loadingF = false;
            state.chefFeedbacks = action.payload;
        })
        .addCase('getChefFeedbacksFailure', (state,action) => {
            state.loadingF = false;
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