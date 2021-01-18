import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bank } from '../../models/Bank';
import { Krav } from '../../models/Krav';
import { Behov } from '../../models/Behov';
import { Codelist } from '../../models/Codelist';
import { Code } from '../../models/Code';
import { Product } from '../../models/Product';

interface KravbankState {
  projects: Bank[];
  selectedProject: number;
  selectedBehov: number;
  selectedKrav: number;
  codelists: Codelist[];
  selectedCodelist: number;
  products: Product[];
}

const initialState: KravbankState = {
  projects: [],
  selectedProject: 0,
  selectedBehov: 0,
  selectedKrav: 0,
  codelists: [],
  selectedCodelist: 0,
  products: []
};

export const fetchBanks = createAsyncThunk('users/fetchById', async () => {
  const response = await fetch(`http://localhost:3001/catalogue`);
  return (await response.json()) as Bank[];
});

const kravbankSlice = createSlice({
  name: 'kravbank',
  initialState,
  reducers: {
    addProject(state, { payload }: PayloadAction<Bank>) {
      state.projects.push(payload);
    },
    selectProject(state, { payload }: PayloadAction<number>) {
      state.selectedProject = payload;
    },
    publishProject(state, { payload }: PayloadAction<Bank>) {},
    editBehov(state, { payload }: PayloadAction<number>) {
      state.selectedBehov = payload;
    },
    editKrav(state, { payload }: PayloadAction<Krav>) {
      state.selectedKrav = payload.id;
    },
    addBehov(state, { payload }: PayloadAction<Behov>) {
      const id = state.selectedProject;
      state.projects[id].behov.push(payload);
    },
    addUnderBehov(state, { payload }: PayloadAction<Behov>) {
      const behovId = state.selectedBehov;
      const kravbankId = state.selectedProject;
      state.projects[kravbankId].behov[behovId].underbehov?.push(payload);
    },
    registerNew(state, { payload }: PayloadAction<Krav>) {
      const kravbankId = state.selectedProject;
      const behovId = state.selectedBehov;
      state.projects[kravbankId].behov[behovId].krav?.push(payload);
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
    addProduct(state, { payload }: PayloadAction<Product>) {
      state.products.push(payload);
    },
    editProduct(state, { payload }: PayloadAction<Product>) {
      let productindex = state.products.findIndex(
        (product) => product.id === payload.id
      );
      state.products[productindex] = payload;
    },
    addKrav(state, { payload }: PayloadAction<Krav>) {},
    banksReceived(state, { payload }: PayloadAction<Bank[]>) {
      state.projects = payload;
      console.log(state.projects);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBanks.fulfilled, (state, { payload }) => {
      state.projects = payload;
    });
  }
});

export const {
  addProject,
  selectProject,
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
  editProduct,
  addProduct,
  banksReceived
} = kravbankSlice.actions;

/*export const fetchBanks = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  const response = await BankService.fetchAll();
  dispatch(banksReceived(response));
};*/

export default kravbankSlice.reducer;
