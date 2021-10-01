import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { Specification } from '../../models/Specification';
import { SpecificationProduct } from '../../models/SpecificationProduct';

interface SpecificationState {
  spec: Specification;
}

const initialState: SpecificationState = {
  spec: {
    bank: {
      id: '',
      title: '',
      description: '',
      needs: [],
      products: [],
      codelist: [],
      tags: [],
      version: 0,
      type: ModelType.bank,
      publications: [],
      inheritedBanks: [],
      publishedDate: null
    },
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
    setBank(state, { payload }: PayloadAction<Bank>) {
      state.spec.bank = payload;
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
      const index = state.spec.requirements.findIndex(
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
