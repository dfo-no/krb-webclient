import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedBankState {
  id: string | null;
}

const initialState: SelectedBankState = { id: null };

const selectedBankSlice = createSlice({
  name: 'selectedBank',
  initialState,
  reducers: {
    selectBank(state, { payload }: PayloadAction<string>) {
      state.id = payload;
    }
  }
});

export const { selectBank } = selectedBankSlice.actions;

export default selectedBankSlice.reducer;
