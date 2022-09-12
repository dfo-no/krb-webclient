import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvaluatedResponse } from '../../Nexus/entities/IEvaluatedResponse';
import { IFile } from '../../models/IFile';
import { IResponse } from '../../Nexus/entities/IResponse';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ModelType, Weighting } from '../../Nexus/enums';

interface ISelectedBankState {
  files: IFile[];
  specFile: IFile | null;
  specification: ISpecification;
  responses: IResponse[];
  evaluations: IEvaluatedResponse[];
}

const initialState: ISelectedBankState = {
  files: [],
  specFile: null,
  specification: {
    id: '',
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
      projectId: null,
      deletedDate: null
    },
    title: '',
    organization: '',
    organizationNumber: '',
    products: [],
    requirements: [],
    requirementAnswers: [],
    weight: Weighting.MEDIUM
  },
  responses: [],
  evaluations: []
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setEvaluationSpecification(
      state,
      { payload }: PayloadAction<ISpecification>
    ) {
      state.specification = payload;
    },
    setResponses(state, { payload }: PayloadAction<IResponse[]>) {
      state.responses = payload;
    },
    setEvaluations(state, { payload }: PayloadAction<IEvaluatedResponse[]>) {
      state.evaluations = payload;
    },
    setFiles(state, { payload }: PayloadAction<IFile[]>) {
      state.files = payload;
    },
    setSpecFile(state, { payload }: PayloadAction<IFile | null>) {
      state.specFile = payload;
    }
  }
});

export const {
  setEvaluationSpecification,
  setEvaluations,
  setFiles,
  setResponses,
  setSpecFile
} = evaluationSlice.actions;

export default evaluationSlice.reducer;
