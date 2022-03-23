import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from '../../models/IResponse';
import ModelType from '../../models/ModelType';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { ISpecification } from '../../Nexus/entities/ISpecification';

interface ISelectedBankState {
  specification: ISpecification;
  responses: IResponse[];
  evaluations: IEvaluatedResponse[];
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
    organization: '',
    organizationNumber: '',
    products: [],
    requirements: [],
    requirementAnswers: []
  },
  responses: [],
  evaluations: []
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
    },
    setEvaluations(state, { payload }: PayloadAction<IEvaluatedResponse[]>) {
      state.evaluations = payload;
    }
  }
});

export const { setSpecification, setResponses, setEvaluations } =
  evaluationSlice.actions;

export default evaluationSlice.reducer;
