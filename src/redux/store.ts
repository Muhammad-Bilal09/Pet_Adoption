import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slice/favoritesSlice';
import petsReducer from './slice/petsSlice';
import profileReducer from './slice/profileSlice'
import authReducer from './slice/authSlice'
import { useDispatch } from 'react-redux';
import conversationReducer from './slice/conversationSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    pets: petsReducer,
    profile: profileReducer,
    auth: authReducer,
    conversation: conversationReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
