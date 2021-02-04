import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedNeedState {
  needId: number | null;
}

const initialState: SelectedNeedState = { needId: null };

const selectedNeedState = createSlice({
  name: 'selectedNeed',
  initialState,
  reducers: {
    selectNeed(state, { payload }: PayloadAction<number>) {
      state.needId = payload;
    }
  }
});

export const { selectNeed } = selectedNeedState.actions;

export default selectedNeedState.reducer;
