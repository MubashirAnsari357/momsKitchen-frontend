import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const dishReducer = createReducer( initialState, (builder) => {
    builder
        // Get All Dishes Cases
        .addCase('getDishesRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('getDishesSuccess', (state, action) => {
            state.loadingD = false;
            state.dishes = action.payload;
        })
        .addCase('getDishesFailure', (state,action) => {
            state.loadingD = false;
            state.error = action.payload;
        })


        .addCase('getDishDetailsRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('getDishDetailsSuccess', (state, action) => {
            state.loadingD = false;
            state.dishDetails = action.payload;
        })
        .addCase('getDishDetailsFailure', (state,action) => {
            state.loadingD = false;
            state.error = action.payload;
        })

        // Get Chef Dishes Cases
        .addCase('chefDishesRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('chefDishesSuccess', (state, action) => {
            state.loadingD = false;
            state.dishesChefs = action.payload;
        })
        .addCase('chefDishesFailure', (state,action) => {
            state.loadingD = false;
            state.error = action.payload;
        })

        // Search Cases
        .addCase('getSearchDishesRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('getSearchDishesSuccess', (state, action) => {
            state.loadingD = false;
            state.searchDishes = action.payload;
        })
        .addCase('getSearchDishesFailure', (state,action) => {
            state.loadingD = false;
            state.error = action.payload;
        })

        // Add Dish
        .addCase('addDishRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('addDishSuccess', (state, action) => {
            state.loadingD = false;
            state.message = action.payload.message;
        })
        .addCase('addDishFailure', (state,action) => {
            state.loadingD = false;
            state.error = action.payload;
        })

        // Add Dish
        .addCase('updateDishRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('updateDishSuccess', (state, action) => {
            state.loadingD = false;
            state.message = action.payload.message;
        })
        .addCase('updateDishFailure', (state,action) => {
            state.loadingD = false;
            state.error = action.payload;
        })


        // Delete Dish
        .addCase('deleteDishRequest', (state) => {
            state.loadingD = true;
        })
        .addCase('deleteDishSuccess', (state, action) => {
            state.loadingD = false;
            state.message = action.payload.message;
        })
        .addCase('deleteDishFailure', (state,action) => {
            state.loadingD = false;
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