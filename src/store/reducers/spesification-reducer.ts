/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import { Requirement } from '../../models/Requirement';
import { SpecificationProduct } from '../../models/SpecificationProduct';
import { RequirementAnswer } from '../../models/RequirementAnswer';
import { Specification } from '../../models/Specification';

interface SpecificationState {
  spec: Specification;
}

const initialState: SpecificationState = {
  spec: {
    bankId: '',
    title: '',
    products: [],
    requirements: [],
    requirementAnswers: []
  }
};

const specificationSlice = createSlice({
  name: 'specification',
  initialState,
  reducers: {
    setSpecification(state, { payload }: PayloadAction<Specification>) {
      state.spec = payload;
    },
    editTitle(state, { payload }: PayloadAction<string>) {
      state.spec.title = payload;
    },
    editBankId(state, { payload }: PayloadAction<string>) {
      state.spec.bankId = payload;
    },
    addProduct(
      state,
      { payload }: PayloadAction<{ product: SpecificationProduct }>
    ) {
      state.spec.products.push(payload.product);
    },
    editSpecProduct(
      state,
      { payload }: PayloadAction<{ product: SpecificationProduct }>
    ) {
      const index = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.product.id
        )
      );
      state.spec.products[index] = payload.product;
    },
    addProductAnswer(
      state,
      {
        payload
      }: PayloadAction<{ answer: RequirementAnswer; productId: string }>
    ) {
      const index = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      state.spec.products[index].requirementAnswers.push(payload.answer);
    },
    addProductRequirement(
      state,
      { payload }: PayloadAction<{ requirement: string; productId: string }>
    ) {
      const index = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      state.spec.products[index].requirements.push(payload.requirement);
    },
    removeProductRequirement(
      state,
      { payload }: PayloadAction<{ requirement: string; productId: string }>
    ) {
      const productIndex = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      const index = state.spec.requirements.findIndex(
        (req) => req === payload.requirement
      );
      state.spec.products[productIndex].requirements.splice(index, 1);
    },
    addAnswer(
      state,
      { payload }: PayloadAction<{ answer: RequirementAnswer }>
    ) {
      state.spec.requirementAnswers.push(payload.answer);
    },
    addRequirement(state, { payload }: PayloadAction<string>) {
      state.spec.requirements.push(payload);
    },
    removeRequirement(state, { payload }: PayloadAction<string>) {
      const index = state.spec.requirements.findIndex((req) => req === payload);
      state.spec.requirements.splice(index, 1);
    }
  }
});

export const {
  addProduct,
  editSpecProduct,
  addAnswer,
  addRequirement,
  removeRequirement,
  setSpecification,
  editTitle,
  editBankId,
  addProductAnswer,
  addProductRequirement,
  removeProductRequirement
} = specificationSlice.actions;

export default specificationSlice.reducer;
