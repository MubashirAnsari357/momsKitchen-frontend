import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./basketSlice";
import { dishReducer } from "./reducers/dishReducer";
import { feedbackReducer } from "./reducers/feedbackReducer";
import { orderReducer } from "./reducers/orderReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import { authReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dishes: dishReducer,
        basket: basketSlice,
        orders: orderReducer,
        feedbacks: feedbackReducer,
        payment: paymentReducer,
    }
})

export default store