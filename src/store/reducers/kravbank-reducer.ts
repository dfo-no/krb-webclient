import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kravbank } from '../../models/Kravbank';
import { Krav } from '../../models/Krav';
import { Behov } from '../../models/Behov';
import { Codelist } from '../../models/Codelist';
import { Code } from '../../models/Code';

interface KravbankState {
  kravbanker: Kravbank[];
  selectedKravbank: number;
  selectedBehov: number;
  selectedKrav: number;
  codelists: Codelist[];
  selectedCodelist: number;
}

const initialState: KravbankState = {
  kravbanker: [],
  selectedKravbank: 0,
  selectedBehov: 0,
  selectedKrav: 0,
  codelists: [],
  selectedCodelist: 0
};

export const fetchBanks = createAsyncThunk('users/fetchById', async () => {
  const response = await fetch(`http://localhost:3001/catalogue`);
  return (await response.json()) as Kravbank[];
});

const kravbankSlice = createSlice({
  name: 'kravbank',
  initialState,
  reducers: {
    newKravbank(state, { payload }: PayloadAction<Kravbank>) {
      state.kravbanker.push(payload);
    },
    editKravbank(state, { payload }: PayloadAction<Kravbank>) {
      state.selectedKravbank = payload.id;
    },
    editBehov(state, { payload }: PayloadAction<number>) {
      state.selectedBehov = payload;
    },
    editKrav(state, { payload }: PayloadAction<Krav>) {
      state.selectedKrav = payload.id;
    },
    addBehov(state, { payload }: PayloadAction<Behov>) {
      const id = state.selectedKravbank;
      state.kravbanker[id].behov.push(payload);
    },
    addUnderBehov(state, { payload }: PayloadAction<Behov>) {
      const behovId = state.selectedBehov;
      const kravbankId = state.selectedKravbank;
      state.kravbanker[kravbankId].behov[behovId].underbehov?.push(payload);
    },
    registerNew(state, { payload }: PayloadAction<Krav>) {
      const kravbankId = state.selectedKravbank;
      const behovId = state.selectedBehov;
      state.kravbanker[kravbankId].behov[behovId].krav?.push(payload);
    },
    addCodelist(state, { payload }: PayloadAction<Codelist>) {
      state.codelists.push(payload);
    },
    selectCodelist(state, { payload }: PayloadAction<number>) {
      state.selectedCodelist = payload;
    },
    editCodelist(state, { payload }: PayloadAction<Codelist>) {
      let codelistindex = state.codelists.findIndex(
        (codelist) => codelist.id === state.selectedCodelist
      );
      state.codelists[codelistindex] = payload;
    },
    addCode(state, { payload }: PayloadAction<Code>) {
      //TODO: find more suitable place to perform this action
      let codelistindex = state.codelists.findIndex(
        (codelist) => codelist.id === state.selectedCodelist
      );
      state.codelists[codelistindex].codes.push(payload);
    },
    editCode(state, { payload }: PayloadAction<Code>) {
      //todo: move to more suitable and less repetetive place
      let listindex = state.codelists.findIndex(
        (codelist) => codelist.id === state.selectedCodelist
      );
      let codeindex = state.codelists[listindex].codes.findIndex(
        (code) => code.id === payload.id
      );
      state.codelists[listindex].codes[codeindex] = payload;
    },
    addKrav(state, { payload }: PayloadAction<Krav>) {},
    banksReceived(state, { payload }: PayloadAction<Kravbank[]>) {
      state.kravbanker = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.fulfilled, (state, { payload }) => {
      state.kravbanker = payload;
    });
  }
});

export const {
  newKravbank,
  editKravbank,
  editBehov,
  editKrav,
  addBehov,
  addUnderBehov,
  registerNew,
  addCodelist,
  addCode,
  editCodelist,
  selectCodelist,
  editCode,
  addKrav,
  banksReceived
} = kravbankSlice.actions;

/*export const fetchBanks = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  const response = await BankService.fetchAll();
  dispatch(banksReceived(response));
};*/

export default kravbankSlice.reducer;
