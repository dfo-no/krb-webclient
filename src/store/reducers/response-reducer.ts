import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { Response } from '../../models/Response';
import { ResponseProduct } from '../../models/ResponseProduct';
import { Specification } from '../../models/Specification';

interface ResponseState {
  response: Response;
}

const initialState: ResponseState = {
  response: {
    spesification: {
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
        sourceRel: null
      },
      title: '',
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
    setResponse(state, { payload }: PayloadAction<Response>) {
      state.response = payload;
    },
    setSpecification(state, { payload }: PayloadAction<Specification>) {
      state.response.spesification = payload;
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
    setBank(state, { payload }: PayloadAction<Bank>) {
      state.response.spesification.bank = payload;
    },
    addProduct(state, { payload }: PayloadAction<ResponseProduct>) {
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
      }: PayloadAction<{ product: ResponseProduct; productIndex: number }>
    ) {
      state.response.products[payload.productIndex] = payload.product;
    }
  }
});

export const {
  setSpecification,
  editSupplier,
  setBank,
  addProduct,
  editProduct,
  setResponse,
  addRequirementAnswer,
  addProductAnswer
} = responseSlice.actions;

export default responseSlice.reducer;
