import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Utils from '../../common/Utils';
import { IBank } from '../../Nexus/entities/IBank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import { IResponse } from '../../models/IResponse';
import { IResponseProduct } from '../../models/IResponseProduct';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ModelType } from '../../enums';

interface IResponseState {
  response: IResponse;
}

const initialState: IResponseState = {
  response: {
    specification: {
      id: '',
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
      title: '',
      organization: '',
      organizationNumber: '',
      products: [],
      requirements: [],
      requirementAnswers: []
    },
    supplier: '',
    products: [],
    requirementAnswers: []
  }
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse(state, { payload }: PayloadAction<IResponse>) {
      state.response = payload;
    },
    setResponseSpecification(
      state,
      { payload }: PayloadAction<ISpecification>
    ) {
      state.response.specification = payload;
    },
    editSupplier(state, { payload }: PayloadAction<string>) {
      state.response.supplier = payload;
    },
    addRequirementAnswer(
      state,
      { payload }: PayloadAction<IRequirementAnswer>
    ) {
      if (
        state.response.requirementAnswers.find(
          (answer) => answer.id === payload.id
        )
      ) {
        const oldSelectIndex = state.response.requirementAnswers.findIndex(
          (answer) => answer.id === payload.id
        );
        state.response.requirementAnswers.splice(oldSelectIndex, 1);
      }
      state.response.requirementAnswers.push(payload);
    },
    setRequirementAnswers(
      state,
      { payload }: PayloadAction<IRequirementAnswer[]>
    ) {
      state.response.requirementAnswers = payload;
    },
    setBank(state, { payload }: PayloadAction<IBank>) {
      state.response.specification.bank = payload;
    },
    addProduct(state, { payload }: PayloadAction<IResponseProduct>) {
      state.response.products.push(payload);
    },
    addProductAnswer(
      state,
      {
        payload
      }: PayloadAction<{ answer: IRequirementAnswer; productId: string }>
    ) {
      const index = Utils.ensure(
        state.response.products.findIndex(
          (product) => product.id === payload.productId
        )
      );
      if (
        state.response.products[index].requirementAnswers.find(
          (answer) => answer.variantId === payload.answer.variantId
        )
      ) {
        const oldSelectIndex = state.response.products[
          index
        ].requirementAnswers.findIndex(
          (answer) => answer.variantId === payload.answer.variantId
        );
        state.response.products[index].requirementAnswers.splice(
          oldSelectIndex,
          1
        );
      }
      state.response.products[index].requirementAnswers.push(payload.answer);
    },
    editProduct(
      state,
      {
        payload
      }: PayloadAction<{ product: IResponseProduct; productIndex: number }>
    ) {
      state.response.products[payload.productIndex] = payload.product;
    },
    setProductRequirementAnswers(
      state,
      {
        payload
      }: PayloadAction<{ answers: IRequirementAnswer[]; productIndex: number }>
    ) {
      state.response.products[payload.productIndex].requirementAnswers =
        payload.answers;
    }
  }
});

export const {
  setResponseSpecification,
  editSupplier,
  setBank,
  addProduct,
  editProduct,
  setResponse,
  addRequirementAnswer,
  addProductAnswer,
  setRequirementAnswers,
  setProductRequirementAnswers
} = responseSlice.actions;

export default responseSlice.reducer;
