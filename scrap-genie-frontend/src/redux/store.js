import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { totals } from "./cart/CartSlice";
import productReducer, { productsFetch } from "./products/ProductsSlice";
import wishlistReducer from "./wishlist/WishlistSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

store.dispatch(productsFetch())
store.dispatch(totals())
