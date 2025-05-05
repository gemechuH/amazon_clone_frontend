import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from './authSlice'
// import {persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "loggedIn"], // Specify which parts of the auth state to persist
};
// Configure cart persistence
const cartPersistConfig = {
  key: "cart",
  storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);


const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);  // Create a persistor for the store

export  { store, persistor };
