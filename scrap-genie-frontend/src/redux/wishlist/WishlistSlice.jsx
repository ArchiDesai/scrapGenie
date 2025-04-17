import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
  reducers: {
    addToWishlist(state, action) {
      const newItem = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item._id === newItem._id
      );

      if (!existingItem) {
        state.wishlistItems.push(newItem);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item._id !== id
      );
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    clearWishlist(state) {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
