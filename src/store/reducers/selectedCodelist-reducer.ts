import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedCodeListState {
  listId: string | null;
}

const initialState: SelectedCodeListState = { listId: null };

const selectedCodeListState = createSlice({
  name: 'selectedCodeList',
  initialState,
  reducers: {
    selectCodeList(state, { payload }: PayloadAction<string>) {
      state.listId = payload;
    }
  }
});

export const { selectCodeList } = selectedCodeListState.actions;

export default selectedCodeListState.reducer;
