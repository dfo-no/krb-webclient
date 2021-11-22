import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrefilledResponse } from '../models/PrefilledResponse';

interface UploadedResponseState {
  prefilledResponse: PrefilledResponse | null;
  markedRequirements: string[];
}

const initialState: UploadedResponseState = {
  prefilledResponse: null,
  markedRequirements: []
};

const uploadedResponseState = createSlice({
  name: 'uploadedResponse',
  initialState,
  reducers: {
    setPrefilledResponse(state, { payload }: PayloadAction<PrefilledResponse>) {
      state.prefilledResponse = payload;
    },
    setMarkedRequirements(state, { payload }: PayloadAction<string[]>) {
      state.markedRequirements = payload;
    }
  }
});

export const { setPrefilledResponse, setMarkedRequirements } =
  uploadedResponseState.actions;

export default uploadedResponseState.reducer;
