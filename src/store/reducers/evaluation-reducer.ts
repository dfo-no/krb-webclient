import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../models/IResponse';
import { ISpecification } from '../../models/ISpecification';
import ModelType from '../../models/ModelType';

interface ISelectedBankState {
  specification: ISpecification;
  responses: IResponse[];
}

const initialState: ISelectedBankState = {
  specification: {
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
      publishedDate: null,
      sourceOriginal: null,
      sourceRel: null,
      projectId: null
    },
    title: '',
    products: [],
    requirements: [],
    requirementAnswers: []
  },
  responses: []
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setSpecification(state, { payload }: PayloadAction<ISpecification>) {
      state.specification = payload;
    },
    setResponses(state, { payload }: PayloadAction<IResponse[]>) {
      state.responses = payload;
    }
  }
});

export const { setSpecification, setResponses } = evaluationSlice.actions;

export default evaluationSlice.reducer;
