import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedResponseProductState {
  productId: string | null;
}

const initialState: SelectedResponseProductState = { productId: null };

const selectedResponseProductState = createSlice({
  name: 'selectedResponseProduct',
  initialState,
  reducers: {
    selectResponseProduct(state, { payload }: PayloadAction<string>) {
      state.productId = payload;
    }
  }
});

export const { selectResponseProduct } = selectedResponseProductState.actions;

export default selectedResponseProductState.reducer;
