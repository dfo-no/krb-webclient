import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { httpGet, httpPost } from '../../api/http';
import { IBank } from '../../models/IBank';

interface BankState {
  // banks: Finished and published versions of banks
  normalizedList: { [key: string]: IBank };
  list: IBank[];
  status: 'idle' | 'fulfilled' | 'rejected' | 'pending';
  latest: IBank[];
  alfabetic: IBank[];
}

const initialState: BankState = {
  normalizedList: {},
  list: [],
  status: 'idle',
  latest: [],
  alfabetic: []
};

export const getAlbefaticalSortedBanksThunk = createAsyncThunk(
  'getAlbefaticalSortedBanksThunk',
  async () => {
    const response = await httpGet<IBank[]>(
      `/api/bank/sorted?fieldName=${'title'}&limit=${5}&order=${'ASC'}`
    );
    return response.data;
  }
);

export const getDateSortedBanksThunk = createAsyncThunk(
  'getDateSortedBanksThunk',
  async () => {
    const response = await httpGet<IBank[]>(
      `/api/bank/sorted?fieldName=${'publishedDate'}&limit=${5}&order=${'DESC'}`
    );
    return response.data;
  }
);
export const getBanksThunk = createAsyncThunk('getBanksThunk', async () => {
  const response = await httpGet<IBank[]>('/api/bank/banks');
  return response.data;
});

export const postBankThunk = createAsyncThunk(
  'postBankThunk',
  async (bank: IBank) => {
    const response = await httpPost<IBank>('/api/bank', bank);
    return response.data;
  }
);

const bankSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBanksThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getBanksThunk.fulfilled, (state, { payload }) => {
      let bankList: { [key: string]: IBank } = {};
      bankList = payload.reduce((banks, bank) => {
        bankList[bank.id] = bank;
        return bankList;
      }, {});
      state.normalizedList = bankList;
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
        state.normalizedList[payload.id] = payload;
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

export default bankSlice.reducer;
