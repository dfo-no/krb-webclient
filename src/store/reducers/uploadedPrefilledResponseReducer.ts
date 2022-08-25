import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPrefilledResponse } from '../../Nexus/entities/IPrefilledResponse';
import { ModelType } from '../../Nexus/enums';

interface UploadedResponseState {
  prefilledResponse: IPrefilledResponse;
  markedRequirements: string[];
  markedProductRequirements: string[];
}

const initialState: UploadedResponseState = {
  prefilledResponse: {
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
      deletedDate: null
    },
    supplier: '',
    products: [],
    answeredVariants: [],
    requirementAnswers: []
  },
  markedRequirements: [],
  markedProductRequirements: []
};

const uploadedResponseState = createSlice({
  name: 'uploadedResponse',
  initialState,
  reducers: {
    setPrefilledResponse(
      state,
      { payload }: PayloadAction<IPrefilledResponse>
    ) {
      state.prefilledResponse = payload;
    },
    setMarkedRequirements(state, { payload }: PayloadAction<string[]>) {
      state.markedRequirements = payload;
    },
    setMarkedProductRequirements(state, { payload }: PayloadAction<string[]>) {
      state.markedRequirements = payload;
    }
  }
});

export const {
  setPrefilledResponse,
  setMarkedRequirements,
  setMarkedProductRequirements
} = uploadedResponseState.actions;

export default uploadedResponseState.reducer;
