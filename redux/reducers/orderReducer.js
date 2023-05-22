import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const orderReducer = createReducer( initialState, (builder) => {
    builder
        // Place Order Cases
        .addCase('placeOrderRequest', (state) => {
            state.loadingO = true;
            state.success = false;
        })
        .addCase('placeOrderSuccess', (state, action) => {
            state.loadingO = false;
            state.message = action.payload.message;
            state.success = action.payload.success;
        })
        .addCase('placeOrderFailure', (state,action) => {
            state.loadingO = false;
            state.error = action.payload;
        })

        // Get User Orders Cases
        .addCase('getUserOrdersRequest', (state) => {
            state.loadingO = true;
        })
        .addCase('getUserOrdersSuccess', (state, action) => {
            state.loadingO = false;
            state.orders = action.payload;
        })
        .addCase('getUserOrdersFailure', (state,action) => {
            state.loadingO = false;
            state.error = action.payload;
        })

    
        // Get Chef Orders Cases
        .addCase('getChefOrdersRequest', (state) => {
            state.loadingO = true;
        })
        .addCase('getChefOrdersSuccess', (state, action) => {
            state.loadingO = false;
            state.chefOrders = action.payload;
        })
        .addCase('getChefOrdersFailure', (state,action) => {
            state.loadingO = false;
            state.error = action.payload;
        })

        // Get Order Details
        .addCase('getOrderDetailsRequest', (state) => {
            state.loadingO = true;
        })
        .addCase('getOrderDetailsSuccess', (state, action) => {
            state.loadingO = false;
            state.order = action.payload;
        })
        .addCase('getOrderDetailsFailure', (state,action) => {
            state.loadingO = false;
            state.error = action.payload;
        })

         // Update Order Status
         .addCase('updateOrderStatusRequest', (state) => {
            state.loadingO = true;
        })
        .addCase('updateOrderStatusSuccess', (state, action) => {
            state.loadingO = false;
            state.message = action.payload.message;
        })
        .addCase('updateOrderStatusFailure', (state,action) => {
            state.loadingO = false;
            state.error = action.payload;
        })

        // Update Delivery Status
        .addCase('updateDeliveryStatusRequest', (state) => {
            state.loadingO = true;
        })
        .addCase('updateDeliveryStatusSuccess', (state, action) => {
            state.loadingO = false;
            state.message = action.payload.message;
        })
        .addCase('updateDeliveryStatusFailure', (state,action) => {
            state.loadingO = false;
            state.error = action.payload;
        })


        // Clear Error and Message

        .addCase('clearError', (state) => {
            state.error = null;
        }) 
        .addCase('clearMessage', (state) => {
            state.message = null;
        }) 
        .addCase('clearSuccess', (state) => {
            state.success = null;
        }) 
    }
)