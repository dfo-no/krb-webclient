import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISelectedQuestionState {
  questionId: string | null;
}

const initialState: ISelectedQuestionState = { questionId: null };

const selectedQuestionState = createSlice({
  name: 'selectedQuestion',
  initialState,
  reducers: {
    selectQuestion(state, { payload }: PayloadAction<string>) {
      state.questionId = payload;
    }
  }
});

export const { selectQuestion } = selectedQuestionState.actions;

export default selectedQuestionState.reducer;
