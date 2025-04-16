import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import modalSlice from '../components/Modal/ModalSlice';

import { authApi } from "../services/Auth";
import { authSlice } from "./Auth";
import { ordersApi } from "../services/Order";
import { productsApi } from "../services/Products";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ordersApi.middleware,
      productsApi.middleware
    ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
