/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Specification } from '../../models/Specification';
import { Response } from '../../models/Response';
import { ResponseProduct } from '../../models/ResponseProduct';

interface ResponseState {
  response: Response;
}

const initialState: ResponseState = {
  response: {
    spesification: {
      bankId: '',
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
    editBankId(state, { payload }: PayloadAction<string>) {
      state.response.spesification.bankId = payload;
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
  editBankId,
  addProduct,
  editProduct,
  setResponse
} = responseSlice.actions;

export default responseSlice.reducer;
