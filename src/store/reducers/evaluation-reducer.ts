import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../models/IFile';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ModelType } from '../../Nexus/enums';

interface ISelectedBankState {
  specFile: IFile | null;
  specification: ISpecification;
}

export const initialEvaluationsState: ISelectedBankState = {
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
    requirementAnswers: []
  }
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState: initialEvaluationsState,
  reducers: {
    setEvaluationSpecification(
      state,
      { payload }: PayloadAction<ISpecification>
    ) {
      state.specification = payload;
    },
    setSpecFile(state, { payload }: PayloadAction<IFile | null>) {
      state.specFile = payload;
    }
  }
});

export const { setEvaluationSpecification, setSpecFile } =
  evaluationSlice.actions;

export default evaluationSlice.reducer;
