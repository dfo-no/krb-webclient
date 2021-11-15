import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import ModelType from '../../models/ModelType';

interface SelectedResponseProductState {
  selectedResponseProduct: IResponseProduct;
  selectedResponseSpecificationProduct: ISpecificationProduct;
}

const initialResponseProduct: IResponseProduct = {
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
const initialResponseSpecificationProduct: ISpecificationProduct = {
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
    selectResponseProduct(state, { payload }: PayloadAction<IResponseProduct>) {
      state.selectedResponseProduct = payload;
    },
    selectResponseSpecificationProduct(
      state,
      { payload }: PayloadAction<ISpecificationProduct>
    ) {
      state.selectedResponseSpecificationProduct = payload;
    }
  }
});

export const { selectResponseProduct, selectResponseSpecificationProduct } =
  selectedResponseProductState.actions;

export default selectedResponseProductState.reducer;
