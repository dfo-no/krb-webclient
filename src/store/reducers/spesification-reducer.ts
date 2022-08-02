import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import SpecificationStoreService from '../../Nexus/services/SpecificationStoreService';
import Utils from '../../common/Utils';
import { IBank } from '../../Nexus/entities/IBank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ISpecificationProduct } from '../../models/ISpecificationProduct';

interface ISpecificationState {
  spec: ISpecification;
}

const initialState: ISpecificationState = {
  spec: SpecificationStoreService.generateDefaultSpecification()
};

const specificationSlice = createSlice({
  name: 'specification',
  initialState,
  reducers: {
    setSpecification(state, { payload }: PayloadAction<ISpecification>) {
      state.spec = payload;
    },
    editTitle(state, { payload }: PayloadAction<string>) {
      state.spec.title = payload;
    },
    setBank(state, { payload }: PayloadAction<IBank>) {
      state.spec.bank = payload;
    },
    addProduct(
      state,
      { payload }: PayloadAction<{ product: ISpecificationProduct }>
    ) {
      state.spec.products.push(payload.product);
    },
    editSpecProduct(
      state,
      { payload }: PayloadAction<{ product: ISpecificationProduct }>
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
      }: PayloadAction<{ answer: IRequirementAnswer; productId: string }>
    ) {
      const index = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      if (
        state.spec.products[index].requirementAnswers.find(
          (answer) => answer.id === payload.answer.id
        )
      ) {
        const oldSelectIndex = state.spec.products[
          index
        ].requirementAnswers.findIndex(
          (answer) => answer.variantId === payload.answer.variantId
        );
        state.spec.products[index].requirementAnswers.splice(oldSelectIndex, 1);
      }
      state.spec.products[index].requirementAnswers.push(payload.answer);
    },
    editProductAnswer(
      state,
      {
        payload
      }: PayloadAction<{ answer: IRequirementAnswer; productId: string }>
    ) {
      const productIndex = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      const index = state.spec.products[
        productIndex
      ].requirementAnswers.findIndex((req) => req.id === payload.answer.id);
      state.spec.products[productIndex].requirementAnswers[index] =
        payload.answer;
    },
    deleteProductAnswer(
      state,
      { payload }: PayloadAction<{ answer: string; productId: string }>
    ) {
      const index = Utils.ensure(
        state.spec.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      const answerIndex = state.spec.requirementAnswers.findIndex(
        (req) => req.id === payload.answer
      );
      state.spec.products[index].requirementAnswers.splice(answerIndex, 1);
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
      const index = state.spec.products[productIndex].requirements.findIndex(
        (req) => req === payload.requirement
      );
      state.spec.products[productIndex].requirements.splice(index, 1);
    },
    addAnswer(
      state,
      { payload }: PayloadAction<{ answer: IRequirementAnswer }>
    ) {
      if (
        state.spec.requirementAnswers.find(
          (answer) => answer.id === payload.answer.id
        )
      ) {
        const oldSelectIndex = state.spec.requirementAnswers.findIndex(
          (answer) => answer.variantId === payload.answer.variantId
        );
        state.spec.requirementAnswers.splice(oldSelectIndex, 1);
      }
      state.spec.requirementAnswers.push(payload.answer);
    },
    editAnswer(
      state,
      { payload }: PayloadAction<{ answer: IRequirementAnswer }>
    ) {
      const index = state.spec.requirementAnswers.findIndex(
        (req) => req.id === payload.answer.id
      );
      state.spec.requirementAnswers[index] = payload.answer;
    },

    deleteAnswer(state, { payload }: PayloadAction<{ answer: string }>) {
      const index = state.spec.requirementAnswers.findIndex(
        (req) => req.id === payload.answer
      );
      state.spec.requirementAnswers.splice(index, 1);
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
  setBank,
  addProductAnswer,
  addProductRequirement,
  removeProductRequirement,
  deleteProductAnswer,
  deleteAnswer,
  editAnswer,
  editProductAnswer
} = specificationSlice.actions;

export default specificationSlice.reducer;
