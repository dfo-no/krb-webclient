import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpGet, httpPost } from '../../api/http';
import { Bank } from '../../models/Bank';

interface BankState {
  // banks: Finished and published versions of banks
  list: Bank[];
  status: 'idle' | 'fulfilled' | 'rejected' | 'pending';
  latest: Bank[];
  alfabetic: Bank[];
}

const initialState: BankState = {
  list: [],
  status: 'idle',
  latest: [],
  alfabetic: []
};

export const getAlbefaticalSortedBanksThunk = createAsyncThunk(
  'getAlbefaticalSortedBanksThunk',
  async () => {
    const response = await httpGet<Bank[]>(
      `/api/bank/sorted?fieldname=${'title'}&limit=${5}`
    );
    return response.data;
  }
);

export const getDateSortedBanksThunk = createAsyncThunk(
  'getDateSortedBanksThunk',
  async () => {
    const response = await httpGet<Bank[]>(
      `/api/bank/sorted?fieldname=${'publishedDate'}&limit=${5}`
    );
    return response.data;
  }
);
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
    builder.addCase(getDateSortedBanksThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getDateSortedBanksThunk.fulfilled, (state, { payload }) => {
      state.latest = payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getDateSortedBanksThunk.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(getAlbefaticalSortedBanksThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(
      getAlbefaticalSortedBanksThunk.fulfilled,
      (state, { payload }) => {
        state.alfabetic = payload;
        state.status = 'fulfilled';
      }
    );
    builder.addCase(getAlbefaticalSortedBanksThunk.rejected, (state) => {
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
