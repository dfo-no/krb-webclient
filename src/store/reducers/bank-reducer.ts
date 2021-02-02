import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { del, get, post, put } from '../../api/http';
import { Bank } from '../../models/Bank';

interface BankState {
  //banks: Finished and published versions of banks
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

export const getBanks = createAsyncThunk('getBanks', async () => {
  const response = await get<Bank[]>(`http://localhost:3001/banks`);
  return response.data;
});

export const postBank = createAsyncThunk('postBank', async (bank: Bank) => {
  const response = await post<Bank>(
    `http://localhost:3001/banks`,
    JSON.stringify(bank)
  );
  return response.data;
});

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
    builder.addCase(getBank.fulfilled, (state, { payload }) => {});
    builder.addCase(getBank.pending, (state, { payload }) => {});
    builder.addCase(getBank.rejected, (state, { payload }) => {});
    builder.addCase(getBanks.pending, (state, { payload }) => {
      state.status = 'pending';
    });
    builder.addCase(getBanks.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getBanks.rejected, (state, { payload }) => {
      state.status = 'rejected';
    });
    builder.addCase(postBank.fulfilled, (state, { payload }) => {});
    builder.addCase(postBank.pending, (state, { payload }) => {});
    builder.addCase(postBank.rejected, (state, { payload }) => {});
    builder.addCase(putBank.fulfilled, (state, { payload }) => {});
    builder.addCase(putBank.pending, (state, { payload }) => {});
    builder.addCase(putBank.rejected, (state, { payload }) => {});
    builder.addCase(deleteBank.fulfilled, (state, { payload }) => {});
    builder.addCase(deleteBank.pending, (state, { payload }) => {});
    builder.addCase(deleteBank.rejected, (state, { payload }) => {});
  }
});

export const { addBanks } = bankSlice.actions;

export default bankSlice.reducer;
