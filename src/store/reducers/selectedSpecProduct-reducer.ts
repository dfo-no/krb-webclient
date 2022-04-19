import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';
import ModelType from '../../models/ModelType';

interface ISelectedSpecProductState {
  selectedSpecificationProduct: ISpecificationProduct;
}

const initialProduct: ISpecificationProduct = {
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
  requirementAnswers: [],
  type: ModelType.specificationProduct,
  sourceOriginal: null,
  sourceRel: null
};

const initialState: ISelectedSpecProductState = {
  selectedSpecificationProduct: initialProduct
};

const selectedSpecProductState = createSlice({
  name: 'selectedSpecProduct',
  initialState,
  reducers: {
    selectSpecificationProduct(
      state,
      { payload }: PayloadAction<ISpecificationProduct>
    ) {
      state.selectedSpecificationProduct = payload;
    }
  }
});

export const { selectSpecificationProduct } = selectedSpecProductState.actions;

export default selectedSpecProductState.reducer;
