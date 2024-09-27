import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import { FavoritesState,Pet } from '../../types/types';


const initialState: FavoritesState = {
  favorites: [],
  status: 'idle',
  error: null,
};

export const toggleFavorite = createAsyncThunk(
  'favorites/toggleFavorite',
  async (pet: Pet, {getState, rejectWithValue}) => {
    try {
      const state: any = getState();
      const userId = state.auth.userId;
      const favorites: Pet[] = state.favorites.favorites;
      const userFavoritesRef = firestore()
        .collection('users')
        .doc(userId)
        .collection('favorites');

      if (favorites.some(favPet => favPet.id === pet.id)) {
        await userFavoritesRef.doc(pet.id).delete();
        return {action: 'remove', petId: pet.id};
      } else {
        await userFavoritesRef.doc(pet.id).set({
          petName: pet.petName,
          type: pet.type,
          petAge: pet.petAge,
          amount: pet.amount,
          imageUrl: pet.imageUrl,
        });
        return {action: 'add', pet};
      }
    } catch (error) {
      return rejectWithValue('Failed to toggle favorite.');
    }
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pet>) => {
      if (!state.favorites.some(pet => pet.id === action.payload.id)) {
        state.favorites.push(action.payload);
        Alert.alert('item added into your favorite list');
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        pet => pet.id !== action.payload,
      );
      Alert.alert('item deleted from your favorite list');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(toggleFavorite.pending, state => {
        state.status = 'loading';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const {action: toggleAction, pet, petId} = action.payload;

        if (toggleAction === 'add' && pet) {
          state.favorites.push(pet);
        } else if (toggleAction === 'remove' && petId) {
          state.favorites = state.favorites.filter(p => p.id !== petId);
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;
