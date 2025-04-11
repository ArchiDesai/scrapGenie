// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   totalQuantity: 0,
//   totalAmount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart(state, action) {
//       const newItem = action.payload;
//       const existingItem = state.items.find((item) => item._id === newItem._id);

//       if (!existingItem) {
//         state.items.push({
//           ...newItem,
//           quantity: 1,
//           totalPrice: newItem.price,
//         });
//       } else {
//         existingItem.quantity++;
//         existingItem.totalPrice = existingItem.totalPrice + newItem.price;
//       }

//       state.totalQuantity++;
//       state.totalAmount = state.items.reduce((total, item) => {
//         return total + item.totalPrice;
//       }, 0);
//     },
//     removeItemFromCart(state, action) {
//       const id = action.payload;
//       const existingItem = state.items.find((item) => item._id === id);

//       if (existingItem.quantity === 1) {
//         state.items = state.items.filter((item) => item._id !== id);
//       } else {
//         existingItem.quantity--;
//         existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
//       }

//       state.totalQuantity--;
//       state.totalAmount = state.items.reduce(
//         (total, item) => {return total + item.totalPrice},
//         0
//       );
//     },
//     clearCart(state) {
//       state.items = [];
//       state.totalQuantity = 0;
//       state.totalAmount = 0;
//     },
//   },
// });

// export const { addItemToCart, removeItemFromCart, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.change;
        if (item.quantity < 1) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
    },
    clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
          },
  },
});

export const { addItem, removeItem, updateQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;