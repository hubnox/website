import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Creator } from '../types';

interface CreatorsState {
  creators: Creator[];
}

const initialState: CreatorsState = {
  creators: [],
};

const creatorsSlice = createSlice({
  name: 'creators',
  initialState,
  reducers: {
    setCreators(state, action: PayloadAction<Creator[]>) {
      state.creators = action.payload;
    },
  },
});

export const { setCreators } = creatorsSlice.actions;
export default creatorsSlice.reducer;
