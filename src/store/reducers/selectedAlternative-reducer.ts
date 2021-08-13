import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedAlternativeState {
  alternativeId: string | null;
}

const initialState: SelectedAlternativeState = { alternativeId: null };

const selectedAlternativeState = createSlice({
  name: 'selectedAlternative',
  initialState,
  reducers: {
    selectAlternative(state, { payload }: PayloadAction<string>) {
      state.alternativeId = payload;
    }
  }
});

export const { selectAlternative } = selectedAlternativeState.actions;

export default selectedAlternativeState.reducer;
