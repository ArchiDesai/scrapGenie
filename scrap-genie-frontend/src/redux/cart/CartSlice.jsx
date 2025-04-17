import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalQuantity: 0,
    totalAmount: 0,
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItem >= 0) {
        state.cartItems[existingItem].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const item = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[item].cartQuantity > 1) {
        state.cartItems[item].cartQuantity -= 1;
      } else if (state.cartItems[item].cartQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      // state.totalQuantity = 0;
      // state.totalAmount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    totals: (state, action) => {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.totalAmount = total;
      state.totalQuantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, totals } =
  cartSlice.actions;
export default cartSlice.reducer;
