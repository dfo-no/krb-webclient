import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../models/IFile';

interface ISelectedBankState {
  specFile: IFile | null;
}

export const initialEvaluationsState: ISelectedBankState = {
  specFile: null
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState: initialEvaluationsState,
  reducers: {
    setSpecFile(state, { payload }: PayloadAction<IFile | null>) {
      state.specFile = payload;
    }
  }
});

export const { setSpecFile } = evaluationSlice.actions;

export default evaluationSlice.reducer;
