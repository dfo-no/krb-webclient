/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpGet, httpPost } from '../../api/http';
import { Bank } from '../../models/Bank';

interface BankState {
  // banks: Finished and published versions of banks
  list: Bank[];
  status: 'idle' | 'fulfilled' | 'rejected' | 'pending';
}

const initialState: BankState = {
  list: [],
  status: 'idle'
};

export const getBanksThunk = createAsyncThunk('getBanksThunk', async () => {
  const response = await httpGet<Bank[]>('/api/bank/banks');
  return response.data;
});

export const postBankThunk = createAsyncThunk(
  'postBankThunk',
  async (bank: Bank) => {
    const response = await httpPost<Bank>('/api/bank', bank);
    return response.data;
  }
);

const bankSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    addBanks(state, { payload }: PayloadAction<Bank[]>) {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBanksThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getBanksThunk.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getBanksThunk.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(postBankThunk.fulfilled, (state, { payload }) => {
      if (payload.publishedDate && payload.publishedDate !== '') {
        state.list.push(payload);
      }
      state.status = 'fulfilled';
    });
    builder.addCase(postBankThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(postBankThunk.rejected, (state) => {
      state.status = 'rejected';
    });
  }
});

export const { addBanks } = bankSlice.actions;

export default bankSlice.reducer;
