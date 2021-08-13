import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedNeedState {
  needId: string | null;
}

const initialState: SelectedNeedState = { needId: null };

const selectedNeedState = createSlice({
  name: 'selectedNeed',
  initialState,
  reducers: {
    selectNeed(state, { payload }: PayloadAction<string>) {
      state.needId = payload;
    }
  }
});

export const { selectNeed } = selectedNeedState.actions;

export default selectedNeedState.reducer;
