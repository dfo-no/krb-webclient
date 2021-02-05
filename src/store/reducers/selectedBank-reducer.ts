/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedBankState {
  id: number | null;
}

const initialState: SelectedBankState = { id: null };

const selectedBankSlice = createSlice({
  name: 'selectedBank',
  initialState,
  reducers: {
    selectBank(state, { payload }: PayloadAction<number>) {
      state.id = payload;
    }
  }
});

export const { selectBank } = selectedBankSlice.actions;

export default selectedBankSlice.reducer;
