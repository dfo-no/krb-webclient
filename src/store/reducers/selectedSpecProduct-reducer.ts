/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedSpecProductState {
  productId: string | null;
}

const initialState: SelectedSpecProductState = { productId: null };

const selectedSpecProductState = createSlice({
  name: 'selectedSpecProduct',
  initialState,
  reducers: {
    selectSpecProduct(state, { payload }: PayloadAction<string>) {
      state.productId = payload;
    }
  }
});

export const { selectSpecProduct } = selectedSpecProductState.actions;

export default selectedSpecProductState.reducer;
