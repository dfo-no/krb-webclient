import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Utils from '../../common/Utils';
import { IRequirementAnswer } from '../../Nexus/entities/IRequirementAnswer';
import { IResponse } from '../../Nexus/entities/IResponse';
import { ModelType } from '../../Nexus/enums';
import { IResponseProduct } from '../../Nexus/entities/IResponseProduct';

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
        deletedDate: null,
      },
      title: '',
      organization: '',
      organizationNumber: '',
      products: [],
      requirements: [],
      requirementAnswers: [],
      currencyUnit: 'NOK',
    },
    supplier: '',
    products: [],
    requirementAnswers: [],
  },
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse(state, { payload }: PayloadAction<IResponse>) {
      state.response = payload;
    },
    editResponseProduct(state, { payload }: PayloadAction<IResponseProduct>) {
      if (
        state.response.products.find((product) => product.id === payload.id)
      ) {
        const productIndex = state.response.products.findIndex(
          (product) => product.id === payload.id
        );
        state.response.products[productIndex] = payload;
      }
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
    addProductAnswer(
      state,
      {
        payload,
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
  },
});

export const {
  setResponse,
  editResponseProduct,
  addRequirementAnswer,
  addProductAnswer,
} = responseSlice.actions;

export default responseSlice.reducer;
