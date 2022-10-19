import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISelectedBankState {
  id: string | null;
}

const initialState: ISelectedBankState = { id: null };

const selectedBankSlice = createSlice({
  name: 'selectedBank',
  initialState,
  reducers: {
    selectBank(state, { payload }: PayloadAction<string>) {
      state.id = payload;
    },
  },
});

export const { selectBank } = selectedBankSlice.actions;

export default selectedBankSlice.reducer;
