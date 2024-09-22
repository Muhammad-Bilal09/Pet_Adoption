import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Pet = {
  id: string;
  petName: string;
  type: string;
  petAge: string;
  amount: string;
  imageUrl: string;
};

type PetsState = {
  selectedPet: Pet | null;
};

const initialState: PetsState = {
  selectedPet: null,
};

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    selectPet(state, action: PayloadAction<Pet>) {
      state.selectedPet = action.payload;
    },
    clearSelectedPet(state) {
      state.selectedPet = null;
    },
  },
});

export const { selectPet, clearSelectedPet } = petsSlice.actions;

export default petsSlice.reducer;
