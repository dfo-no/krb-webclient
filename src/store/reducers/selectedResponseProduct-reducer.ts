import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModelType from '../../models/ModelType';
import { ResponseProduct } from '../../models/ResponseProduct';

interface SelectedResponseProductState {
  selectedResponseProduct: ResponseProduct;
}

const initialResponseProduct: ResponseProduct = {
  id: '',
  title: '',
  description: '',
  requirementAnswers: [],
  price: 0,
  type: ModelType.responseProduct,
  originProduct: {
    id: '',
    title: ' ',
    description: '',
    originProduct: {
      id: '',
      title: '',
      description: '',
      parent: '',
      type: ModelType.product
    },
    type: ModelType.specificationProduct,
    weight: 0,
    amount: 0,
    requirements: [],
    requirementAnswers: []
  }
};

const initialState: SelectedResponseProductState = {
  selectedResponseProduct: initialResponseProduct
};

const selectedResponseProductState = createSlice({
  name: 'selectedResponseProduct',
  initialState,
  reducers: {
    selectResponseProduct(state, { payload }: PayloadAction<ResponseProduct>) {
      state.selectedResponseProduct = payload;
    }
  }
});

export const { selectResponseProduct } = selectedResponseProductState.actions;

export default selectedResponseProductState.reducer;
