import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/cart/CartSlice";

export const store = configureStore({
	reducer: {
		cart: counterReducer,
	},
	// ,
	// middleware: (getDefaultMiddleware) => {
	//   return getDefaultMiddleware().concat(apiSlice.middleware);
	// },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
