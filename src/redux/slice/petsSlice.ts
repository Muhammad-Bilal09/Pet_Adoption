import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Pet,PetsState } from '../../types/types';


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

export const {selectPet, clearSelectedPet} = petsSlice.actions;

export default petsSlice.reducer;
