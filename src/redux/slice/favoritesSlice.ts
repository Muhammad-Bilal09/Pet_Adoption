// redux/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Pet = {
  id: string;
  petName: string;
  type: string;
  petAge: string;
  amount: string;
  imageUrl: string;
};

interface FavoritesState {
  favorites: Pet[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pet>) => {
      if (!state.favorites.some(pet => pet.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(pet => pet.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
