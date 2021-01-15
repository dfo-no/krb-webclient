import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kravbank } from '../../models/Kravbank';
import { Krav } from '../../models/Krav';
import { Behov } from '../../models/Behov';
import { Kodeliste } from '../../models/Kodeliste';
import { Kode } from '../../models/Kode';

interface KravbankState {
  kravbanker: Kravbank[];
  selectedKravbank: number;
  selectedBehov: number;
  selectedKrav: number;
  kodelister: Kodeliste[];
  selectedKodeliste: number;
}

const initialState: KravbankState = {
  kravbanker: [],
  selectedKravbank: 0,
  selectedBehov: 0,
  selectedKrav: 0,
  kodelister: [],
  selectedKodeliste: 0
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
    addKodeliste(state, { payload }: PayloadAction<Kodeliste>) {
      state.kodelister.push(payload);
    },
    selectKodeliste(state, { payload }: PayloadAction<number>) {
      state.selectedKodeliste = payload;
    },
    editKodeliste(state, { payload }: PayloadAction<Kodeliste>) {
      let kodelisteindex = state.kodelister.findIndex(
        (kodeliste) => kodeliste.id === state.selectedKodeliste
      );
      state.kodelister[kodelisteindex] = payload;
    },
    addKode(state, { payload }: PayloadAction<Kode>) {
      //TODO: find more suitable place to perform this action
      let kodelisteindex = state.kodelister.findIndex(
        (kodeliste) => kodeliste.id === state.selectedKodeliste
      );
      state.kodelister[kodelisteindex].koder.push(payload);
    },
    editKode(state, { payload }: PayloadAction<Kode>) {
      //todo: move to more suitable and less repetetive place
      let listindex = state.kodelister.findIndex(
        (kodeliste) => kodeliste.id === state.selectedKodeliste
      );
      let codeindex = state.kodelister[listindex].koder.findIndex(
        (code) => code.id === payload.id
      );
      state.kodelister[listindex].koder[codeindex] = payload;
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
  addKodeliste,
  addKode,
  editKodeliste,
  selectKodeliste,
  editKode,
  addKrav,
  banksReceived
} = kravbankSlice.actions;

/*export const fetchBanks = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  const response = await BankService.fetchAll();
  dispatch(banksReceived(response));
};*/

export default kravbankSlice.reducer;
