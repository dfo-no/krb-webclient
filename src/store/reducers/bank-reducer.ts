/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpGet } from '../../api/http';
import { CosmosApi } from '../../database/CosmosApi';
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
  const response = await httpGet<Bank[]>('/api/bank/projects');
  return response.data;
});

export const postBankThunk = createAsyncThunk(
  'postBank',
  async (bank: Bank) => {
    const api = new CosmosApi();
    const result = await api.createBank(bank);
    return result.resource as Bank;
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
    /* builder.addCase(postBankThunk.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
    });
    builder.addCase(postBankThunk.pending, (state, { payload }) => {
      state.status = 'pending';
    });
    builder.addCase(postBankThunk.rejected, (state, { payload }) => {
      state.status = 'rejected';
    }); */
  }
});

export const { addBanks } = bankSlice.actions;

export default bankSlice.reducer;
