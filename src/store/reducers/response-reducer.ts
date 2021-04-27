/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Specification } from '../../models/Specification';
import { Response } from '../../models/Response';

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
    title: '',
    products: [],
    requirementAnswers: []
  }
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setSpecification(state, { payload }: PayloadAction<Specification>) {
      state.response.spesification = payload;
    },
    editTitle(state, { payload }: PayloadAction<string>) {
      state.response.title = payload;
    },
    editBankId(state, { payload }: PayloadAction<string>) {
      state.response.spesification.bankId = payload;
    }
  }
});

export const {
  setSpecification,
  editTitle,
  editBankId
} = responseSlice.actions;

export default responseSlice.reducer;
