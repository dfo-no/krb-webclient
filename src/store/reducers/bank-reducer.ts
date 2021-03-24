/* eslint-disable no-param-reassign */
import { FeedResponse } from '@azure/cosmos';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { del, get, post, put } from '../../api/http';
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

export const getBank = createAsyncThunk('getBank', async (id: number) => {
  const response = await get<Bank[]>(`http://localhost:3001/banks/${id}`);
  return response.data;
});

export const getBanksThunk = createAsyncThunk('getBanks', async () => {
  const api = new CosmosApi();
  const result: FeedResponse<Bank[]> = await api.fetchAllBanks();
  const banks: Bank[] = [];
  for (let i = 0; i < result.resources.length; i += 1) {
    // TODO: do not fetch inedxed
    const element = result.resources[i] as unknown;
    banks.push(element as Bank);
  }
  return banks;
});

export const postBankThunk = createAsyncThunk(
  'postBank',
  async (bank: Bank) => {
    const api = new CosmosApi();
    const result = await api.createBank(bank);
    return result.resource as Bank;
  }
);

export const putBank = createAsyncThunk('putBank', async (bank: Bank) => {
  const response = await put(
    `http://localhost:3001/banks/${bank.id}`,
    JSON.stringify(bank)
  );
  return response.data;
});

export const deleteBank = createAsyncThunk('deleteBank', async (bank: Bank) => {
  const response = await del(`http://localhost:3001/banks/${bank.id}`, {
    method: 'DELETE'
  });
  return response.data;
});

const bankSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    addBanks(state, { payload }: PayloadAction<Bank[]>) {
      state.list = payload;
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(getBank.fulfilled, (state, { payload }) => {});
    // builder.addCase(getBank.pending, (state, { payload }) => {});
    // builder.addCase(getBank.rejected, (state, { payload }) => {});
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
    // builder.addCase(putBank.fulfilled, (state, { payload }) => {});
    // builder.addCase(putBank.pending, (state, { payload }) => {});
    // builder.addCase(putBank.rejected, (state, { payload }) => {});
    // builder.addCase(deleteBank.fulfilled, (state, { payload }) => {});
    // builder.addCase(deleteBank.pending, (state, { payload }) => {});
    // builder.addCase(deleteBank.rejected, (state, { payload }) => {});
  }
});

export const { addBanks } = bankSlice.actions;

export default bankSlice.reducer;
