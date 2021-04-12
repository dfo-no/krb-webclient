/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import { Requirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RequirementAnswer } from '../../models/RequirementAnswer';

interface SpecificationState {
  products: SpecificationProduct[];
  requirements: Requirement[];
  requirementAnswers: RequirementAnswer[];
}

const initialState: SpecificationState = {
  products: [],
  requirements: [],
  requirementAnswers: []
};

const specificationSlice = createSlice({
  name: 'specification',
  initialState,
  reducers: {
    addProduct(
      state,
      { payload }: PayloadAction<{ product: SpecificationProduct }>
    ) {
      state.products.push(payload.product);
    },
    editSpecProduct(
      state,
      { payload }: PayloadAction<{ product: SpecificationProduct }>
    ) {
      const index = Utils.ensure(
        state.products.findIndex((product) => product.id === payload.product.id)
      );
      state.products[index] = payload.product;
    },
    addAnswer(
      state,
      { payload }: PayloadAction<{ answer: RequirementAnswer }>
    ) {
      state.requirementAnswers.push(payload.answer);
    }
  }
});

export const {
  addProduct,
  editSpecProduct,
  addAnswer
} = specificationSlice.actions;

export default specificationSlice.reducer;
