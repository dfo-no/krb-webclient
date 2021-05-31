/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Specification } from '../../models/Specification';
import { Response } from '../../models/Response';
import { ResponseProduct } from '../../models/ResponseProduct';
import { IRequirementAnswer } from '../../models/IRequirementAnswer';
import ModelType from '../../models/ModelType';
import { Bank } from '../../models/Bank';

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
        products: [],
        codelist: [],
        version: 0,
        type: ModelType.bank,
        publications: []
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
    addReqAns(state, { payload }: PayloadAction<IRequirementAnswer>) {
      if (
        state.response.requirementAnswers.find(
          (answer) => answer.reqTextId === payload.reqTextId
        )
      ) {
        const oldSelectIndex = state.response.requirementAnswers.findIndex(
          (answer) => answer.reqTextId === payload.reqTextId
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
  addReqAns
} = responseSlice.actions;

export default responseSlice.reducer;
