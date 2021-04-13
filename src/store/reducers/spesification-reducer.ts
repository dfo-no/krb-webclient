/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import { Requirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RequirementAnswer } from '../../models/RequirementAnswer';

interface SpecificationState {
  products: SpecificationProduct[];
  requirements: string[];
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
    },
    addRequirement(state, { payload }: PayloadAction<string>) {
      state.requirements.push(payload);
    },
    removeRequirement(state, { payload }: PayloadAction<string>) {
      const index = state.requirements.findIndex((req) => req === payload);
      state.requirements.splice(index, 1);
    }
  }
});

export const {
  addProduct,
  editSpecProduct,
  addAnswer,
  addRequirement,
  removeRequirement
} = specificationSlice.actions;

export default specificationSlice.reducer;
