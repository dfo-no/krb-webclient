import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../models/IFile';
import { ISpecification } from '../../Nexus/entities/ISpecification';
import { ModelType } from '../../Nexus/enums';

interface ISelectedBankState {
  files: IFile[];
  specFile: IFile | null;
  specification: ISpecification;
}

export const initialEvaluationsState: ISelectedBankState = {
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
    setFiles(state, { payload }: PayloadAction<IFile[]>) {
      state.files = payload;
    },
    setSpecFile(state, { payload }: PayloadAction<IFile | null>) {
      state.specFile = payload;
    }
  }
});

export const { setEvaluationSpecification, setFiles, setSpecFile } =
  evaluationSlice.actions;

export default evaluationSlice.reducer;
