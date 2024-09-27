import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ProfileState } from '../../types/types';


const initialState: ProfileState = {
  username: '',
  email: '',
  profileImage: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        profileImage: string | null;
      }>,
    ) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profileImage = action.payload.profileImage;
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    updateProfileImage: (state, action: PayloadAction<string | null>) => {
      state.profileImage = action.payload;
    },
  },
});

export const {setProfile, updateUsername, updateProfileImage} =
  profileSlice.actions;

export default profileSlice.reducer;
