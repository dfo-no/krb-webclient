import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedAlternativeState {
  questionId: string | null;
}

const initialState: SelectedAlternativeState = { questionId: null };

const selectedAlternativeState = createSlice({
  name: 'selectedAlternative',
  initialState,
  reducers: {
    selectAlternative(state, { payload }: PayloadAction<string>) {
      state.questionId = payload;
    }
  }
});

export const { selectAlternative } = selectedAlternativeState.actions;

export default selectedAlternativeState.reducer;
