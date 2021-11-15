import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../models/IProduct';
import ModelType from '../../models/ModelType';

interface SelectedProductState {
  product: IProduct;
}

const initialState: SelectedProductState = {
  product: {
    id: '',
    title: '',
    description: '',
    parent: '',
    type: ModelType.product,
    sourceOriginal: null,
    sourceRel: null
  }
};

const selectedProductState = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    selectProduct(state, { payload }: PayloadAction<IProduct>) {
      state.product = payload;
    }
  }
});

export const { selectProduct } = selectedProductState.actions;

export default selectedProductState.reducer;
