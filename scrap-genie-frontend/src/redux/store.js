// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cart/CartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/CartSlice";
import wishlistReducer from "./wishlist/WishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
