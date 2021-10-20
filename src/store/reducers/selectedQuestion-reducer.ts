import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedAlternativeState {
  questionId: string | null;
}

const initialState: SelectedAlternativeState = { questionId: null };

const selectedAlternativeState = createSlice({
  name: 'selectedQuestion',
  initialState,
  reducers: {
    selectQuestion(state, { payload }: PayloadAction<string>) {
      state.questionId = payload;
    }
  }
});

export const { selectQuestion } = selectedAlternativeState.actions;

export default selectedAlternativeState.reducer;
