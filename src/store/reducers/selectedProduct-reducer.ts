import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedProductState {
  productId: string | null;
}

const initialState: SelectedProductState = { productId: null };

const selectedProductState = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    selectProduct(state, { payload }: PayloadAction<string>) {
      state.productId = payload;
    }
  }
});

export const { selectProduct } = selectedProductState.actions;

export default selectedProductState.reducer;
