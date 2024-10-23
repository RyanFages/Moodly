// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';

// Importe ton slice utilisateur
import userReducer from './UserSlice';

// Combine les réducteurs si tu en as plusieurs
const rootReducer = combineReducers({
  user: userReducer,
});

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store avec configureStore de Redux Toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Crée le persistor
const persistor = persistStore(store);

export { store, persistor };
