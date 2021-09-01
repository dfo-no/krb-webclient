import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ModelType from '../../models/ModelType';
import { SpecificationProduct } from '../../models/SpecificationProduct';

interface SelectedSpecProductState {
  selectedSpecificationProduct: SpecificationProduct;
}

const initialProduct: SpecificationProduct = {
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
};

const initialState: SelectedSpecProductState = {
  selectedSpecificationProduct: initialProduct
};

const selectedSpecProductState = createSlice({
  name: 'selectedSpecProduct',
  initialState,
  reducers: {
    selectSpecificationProduct(
      state,
      { payload }: PayloadAction<SpecificationProduct>
    ) {
      state.selectedSpecificationProduct = payload;
    }
  }
});

export const { selectSpecificationProduct } = selectedSpecProductState.actions;

export default selectedSpecProductState.reducer;
