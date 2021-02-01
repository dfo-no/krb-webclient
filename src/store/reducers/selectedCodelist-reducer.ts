import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCodeListState {
  id: number | null;
}

const initialState: SelectedCodeListState = { id: null };

const selectedCodeListState = createSlice({
  name: 'selectedCodeList',
  initialState,
  reducers: {
    selectCodeList(state, { payload }: PayloadAction<number>) {
      state.id = payload;
    }
  }
});

export const { selectCodeList } = selectedCodeListState.actions;

export default selectedCodeListState.reducer;
