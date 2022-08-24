import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

import Utils from '../../common/Utils';
import { IBank } from '../../Nexus/entities/IBank';
import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { IPrefilledResponseProduct } from '../../Nexus/entities/IPrefilledResponseProduct';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { ModelType } from '../../Nexus/enums';

interface IPrefilledResponseState {
  prefilledResponse: IPrefilledResponse;
  selectedProduct: IPrefilledResponseProduct;
}

const initialState: IPrefilledResponseState = {
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
      publications: [],
      inheritedBanks: [],
      publishedDate: null,
      sourceOriginal: null,
      sourceRel: null,
      projectId: null,
      deletedDate: null
    },
    // answeredVariants: [], // list over string med id som er besvart, uavhengig questiontype, drit i denne
    supplier: '',
    products: [],
    requirementAnswers: [] // RequirementAnswer[]
  },
  selectedProduct: {
    id: '',
    title: '',
    description: '',
    originProduct: {
      id: '',
      title: '',
      description: '',
      parent: '',
      children: [],
      type: ModelType.product,
      sourceOriginal: null,
      sourceRel: null,
      deletedDate: null
    },
    answeredVariants: [],
    requirementAnswers: [],
    relatedProducts: []
  }
};

const responseSlice = createSlice({
  name: 'prefilledResponse',
  initialState,
  reducers: {
    setResponse(state, { payload }: PayloadAction<IPrefilledResponse>) {
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
    addAnswer(state, { payload }: PayloadAction<IRequirementAnswer>) {
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
    removeAnswer(state, { payload }: PayloadAction<string>) {
      const index = state.prefilledResponse.requirementAnswers.findIndex(
        (element) => element.id === payload
      );
      if (index !== -1) {
        state.prefilledResponse.requirementAnswers.splice(index, 1);
      }
    },

    setBank(state, { payload }: PayloadAction<IBank>) {
      state.prefilledResponse.bank = payload;
    },
    addProduct(state, { payload }: PayloadAction<IPrefilledResponseProduct>) {
      state.prefilledResponse.products.push(payload);
    },
    removeProduct(state, { payload }: PayloadAction<string>) {
      const index = state.prefilledResponse.products.findIndex(
        (product) => product.id === payload
      );
      if (index !== -1) {
        state.prefilledResponse.products.splice(index, 1);
      }
    },
    addProductAnswer(
      state,
      {
        payload
      }: PayloadAction<{ answer: IRequirementAnswer; productId: string }>
    ) {
      const index = state.prefilledResponse.products.findIndex(
        (product) => product.id === payload.productId
      );

      if (index !== -1) {
        const variantIndex = state.prefilledResponse.products[
          index
        ].requirementAnswers.findIndex(
          (answer) => answer.variantId === payload.answer.variantId
        );
        if (variantIndex !== -1) {
          // variant exists already, remove it
          state.prefilledResponse.products[index].requirementAnswers.splice(
            variantIndex,
            1
          );
        }
        state.prefilledResponse.products[index].requirementAnswers.push(
          payload.answer
        );
      }
    },
    removeProductAnswer(
      state,
      { payload }: PayloadAction<{ answerId: string; productId: string }>
    ) {
      const index = state.prefilledResponse.products.findIndex(
        (product) => product.id === payload.productId
      );
      if (index !== -1) {
        const reqAnswerIndex = state.prefilledResponse.products[
          index
        ].requirementAnswers.findIndex(
          (element) => element.id === payload.answerId
        );
        if (reqAnswerIndex !== -1) {
          state.prefilledResponse.products[index].requirementAnswers.splice(
            reqAnswerIndex,
            1
          );
        }
      }
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
        product: IPrefilledResponseProduct;
        productIndex: number;
      }>
    ) {
      state.prefilledResponse.products[payload.productIndex] = payload.product;
    },
    selectProduct(
      state,
      { payload }: PayloadAction<IPrefilledResponseProduct>
    ) {
      state.selectedProduct = payload;
    }
  }
});

export const {
  editSupplier,
  setBank,
  addProduct,
  removeProduct,
  editProduct,
  setResponse,
  addAnswer,
  removeAnswer,
  addProductAnswer,
  removeProductAnswer,
  setRequirementAnswers,
  selectProduct
} = responseSlice.actions;

export default responseSlice.reducer;
