import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ISpecificationProduct } from '../../Nexus/entities/ISpecificationProduct';
import { ModelType } from '../../Nexus/enums';

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
    sourceRel: null,
    deletedDate: null
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
