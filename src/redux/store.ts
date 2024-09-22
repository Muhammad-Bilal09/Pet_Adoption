// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slice/favoritesSlice';
import petsReducer from './slice/petsSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    pets: petsReducer,
  },
});

// Export RootState and AppDispatch for typing in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
