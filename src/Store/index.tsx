// store.ts
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import orderReducer from "./orderSlice";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { userReducer, filterReducer, orderReducer };
export default store;
