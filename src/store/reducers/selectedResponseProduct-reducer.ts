import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModelType from '../../models/ModelType';
import { ResponseProduct } from '../../models/ResponseProduct';
import { SpecificationProduct } from '../../models/SpecificationProduct';

interface SelectedResponseProductState {
  selectedResponseProduct: ResponseProduct;
  selectedResponseSpecificationProduct: SpecificationProduct;
}

const initialResponseProduct: ResponseProduct = {
  id: '',
  title: '',
  description: '',
  requirementAnswers: [],
  price: 0,
  originProduct: {
    id: '',
    title: ' ',
    description: '',
    originProduct: {
      id: '',
      title: '',
      description: '',
      parent: '',
      type: ModelType.product,
      sourceOriginal: null,
      sourceRel: null
    },
    weight: 0,
    amount: 0,
    requirements: [],
    requirementAnswers: []
  }
};
const initialResponseSpecificationProduct: SpecificationProduct = {
  id: '',
  title: ' ',
  description: '',
  originProduct: {
    id: '',
    title: '',
    description: '',
    parent: '',
    type: ModelType.product,
    sourceOriginal: null,
    sourceRel: null
  },
  weight: 0,
  amount: 0,
  requirements: [],
  requirementAnswers: []
};

const initialState: SelectedResponseProductState = {
  selectedResponseProduct: initialResponseProduct,
  selectedResponseSpecificationProduct: initialResponseSpecificationProduct
};

const selectedResponseProductState = createSlice({
  name: 'selectedResponseProduct',
  initialState,
  reducers: {
    selectResponseProduct(state, { payload }: PayloadAction<ResponseProduct>) {
      state.selectedResponseProduct = payload;
    },
    selectResponseSpecificationProduct(
      state,
      { payload }: PayloadAction<SpecificationProduct>
    ) {
      state.selectedResponseSpecificationProduct = payload;
    }
  }
});

export const { selectResponseProduct, selectResponseSpecificationProduct } =
  selectedResponseProductState.actions;

export default selectedResponseProductState.reducer;
