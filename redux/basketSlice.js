import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { setBasket, getBasket, removeBasket } from "../utils/basket";

export const addItem = createAsyncThunk(
  
  "basket/addItem",
  async (payload, { rejectWithValue }) => {
    if (!payload.userId) {
      Toast.show({
        type: "error",
        text1: "Please log in to add items to the basket",
        position: "top",
      });
      return rejectWithValue();
    }

    const userId = payload.userId;
    const basket = await getBasket(userId);
    let items = [...basket.items];
    let total = basket.total;

    const existingIndex = items.findIndex((item) => item._id === payload._id);

    if (existingIndex !== -1) {
      items[existingIndex].quantity += payload.quantity;
      items[existingIndex].itemTotal =
        items[existingIndex].quantity * payload.price;
      total += payload.price * payload.quantity;
    } else {
      const itemTotal = payload.price * payload.quantity;
      items.push({ ...payload, itemTotal });
      total += itemTotal;
      Toast.show({
        type: "success",
        text1: "Item added to basket",
        position: "top",
      });
    }

    const updatedBasket = { items, total };
    await setBasket(userId, updatedBasket);
    return updatedBasket;

  }
);

export const decrementQuantity = createAsyncThunk(
  "basket/decrementQuantity",
  async (payload, { rejectWithValue }) => {
    const userId = payload.userId;
    const basket = await getBasket(userId);
    const items = [...basket.items];
    let total = basket.total;

    const itemIndex = items.findIndex((item) => item._id === payload._id);

    if (itemIndex !== -1 && items[itemIndex].quantity > 1) {
      items[itemIndex].quantity -= 1;
      items[itemIndex].itemTotal =
        items[itemIndex].quantity * items[itemIndex].price;
      total -= items[itemIndex].price;
    }

    const updatedBasket = { items, total };
    await setBasket(userId, updatedBasket);
    return updatedBasket;
  }
);

export const removeItem = createAsyncThunk(
  "basket/removeItem",
  async (payload, { rejectWithValue }) => {
    const userId = payload.userId;
    const basket = await getBasket(userId);
    const items = [...basket.items];
    let total = basket.total;

    const itemIndex = items.findIndex((item) => item._id === payload._id);

    if (itemIndex !== -1) {
      const itemToRemove = items[itemIndex];
      items.splice(itemIndex, 1);
      total -= itemToRemove.itemTotal;
      Toast.show({
        type: "info",
        text1: "Item removed from basket",
        position: "bottom",
      });
    }

    const updatedBasket = { items, total };
    await setBasket(userId, updatedBasket);
    return updatedBasket;
  }
);

export const clearCart = createAsyncThunk(
  "basket/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      await removeBasket(userId);
      return { items: [], total: 0 };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(addItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(decrementQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(decrementQuantity.rejected, (state) => {
        state.loading = false;
      })
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(removeItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export default basketSlice.reducer;
