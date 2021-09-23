import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { PrefilledResponse } from '../../models/PrefilledResponse';
import { PrefilledResponseProduct } from '../../models/PrefilledResponseProduct';
// import RequirementAnswer from '../../SpecEditor/Requirement/RequirementAnswer';

interface PrefilledResponseState {
  prefilledResponse: PrefilledResponse;
}

const initialState: PrefilledResponseState = {
  prefilledResponse: {
    bank: {
      id: '',
      title: '',
      description: '',
      needs: [],
      tags: [],
      products: [],
      codelist: [],
      version: 0,
      type: ModelType.bank,
      publications: []
    },
    // answeredVariants: [], // list over string med id som er besvart, uavhengig questiontype, drit i denne
    supplier: '',
    products: [],
    requirementAnswers: [], // RequirementAnswer[]
    type: ModelType.prefilledResponse
  }
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse(state, { payload }: PayloadAction<PrefilledResponse>) {
      state.prefilledResponse = payload;
    },
    editSupplier(state, { payload }: PayloadAction<string>) {
      state.prefilledResponse.supplier = payload;
    },
    setRequirementAnswers(
      state,
      { payload }: PayloadAction<{ cart: IRequirementAnswer[] }>
    ) {
      // TODO: Why is cloneDeep nesccecary here???
      const cloned = cloneDeep(payload.cart);
      state.prefilledResponse.requirementAnswers = cloned;
    },
    addRequirementAnswer(
      state,
      { payload }: PayloadAction<IRequirementAnswer>
    ) {
      if (
        state.prefilledResponse.requirementAnswers.find(
          (answer) => answer.id === payload.id
        )
      ) {
        const oldSelectIndex =
          state.prefilledResponse.requirementAnswers.findIndex(
            (answer) => answer.id === payload.id
          );
        state.prefilledResponse.requirementAnswers.splice(oldSelectIndex, 1);
      }
      state.prefilledResponse.requirementAnswers.push(payload);
    },
    setBank(state, { payload }: PayloadAction<Bank>) {
      state.prefilledResponse.bank = payload;
    },
    addProduct(state, { payload }: PayloadAction<PrefilledResponseProduct>) {
      state.prefilledResponse.products.push(payload);
    },
    addProductAnswer(
      state,
      {
        payload
      }: PayloadAction<{ answer: IRequirementAnswer; productId: string }>
    ) {
      const index = Utils.ensure(
        state.prefilledResponse.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      if (
        state.prefilledResponse.products[index].requirementAnswers.find(
          (answer) => answer.variantId === payload.answer.variantId
        )
      ) {
        const oldSelectIndex = state.prefilledResponse.products[
          index
        ].requirementAnswers.findIndex(
          (answer) => answer.variantId === payload.answer.variantId
        );
        state.prefilledResponse.products[index].requirementAnswers.splice(
          oldSelectIndex,
          1
        );
      }
      state.prefilledResponse.products[index].requirementAnswers.push(
        payload.answer
      );
    },
    addProductVariant(
      state,
      { payload }: PayloadAction<{ requirement: string; productId: string }>
    ) {
      const index = Utils.ensure(
        state.prefilledResponse.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      state.prefilledResponse.products[index].answeredVariants.push(
        payload.requirement
      );
    },
    /* addVariant(state, { payload }: PayloadAction<string>) {
      state.prefilledResponse.answeredVariants.push(payload);
    }, */
    editProduct(
      state,
      {
        payload
      }: PayloadAction<{
        product: PrefilledResponseProduct;
        productIndex: number;
      }>
    ) {
      state.prefilledResponse.products[payload.productIndex] = payload.product;
    }
  }
});

export const {
  editSupplier,
  setBank,
  addProduct,
  editProduct,
  setResponse,
  addRequirementAnswer,
  addProductAnswer,
  setRequirementAnswers
} = responseSlice.actions;

export default responseSlice.reducer;
