import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./features/dakmode/darkModeSlice";
import signUpReducer from "./features/auth/signUpSlice";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    signUp: signUpReducer,
    cart: cartReducer,
  },
});
