/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bank } from '../../models/Bank';
import { Need } from '../../models/Need';
import { Codelist } from '../../models/Codelist';
import { Code } from '../../models/Code';
import { Product } from '../../models/Product';
import { Publication } from '../../models/Publication';
import { Requirement } from '../../models/Requirement';

interface KravbankState {
  // projects: banks being edited, not published.
  // banks: Finished and published versions of banks
  projects: Bank[];
  selectedProject: Bank | null;
  selectedBank: Bank | null;
  selectedNeed: number;
  codelists: Codelist[];
  selectedCodelist: number;
  products: Product[];
  banks: Bank[];
}

const initialState: KravbankState = {
  projects: [],
  selectedProject: null,
  selectedBank: null,
  selectedNeed: 0,
  codelists: [],
  selectedCodelist: 0,
  products: [],
  banks: []
};

const kravbankSlice = createSlice({
  name: 'kravbank',
  initialState,
  reducers: {
    addBanks(state, { payload }: PayloadAction<Bank[]>) {
      state.projects = payload;
    },
    selectBank(state, { payload }: PayloadAction<Bank>) {
      state.selectedBank = payload;
    },
    addProject(state, { payload }: PayloadAction<Bank>) {
      state.projects.push(payload);
    },
    editProject(state, { payload }: PayloadAction<Bank>) {
      const id = state.selectedProject?.id;
      const projectindex = state.projects.findIndex(
        (project) => project.id === id
      );
      state.projects[projectindex] = payload;
    },

    publishProject(state, { payload }: PayloadAction<Publication>) {
      const id = state.selectedProject?.id;
      const projectindex = state.projects.findIndex(
        (project) => project.id === id
      );
      const project = state.projects[projectindex];
      const publishedProject = state.projects[projectindex];
      publishedProject.publishedDate = payload.date;

      state.banks.push(publishedProject);
      // increase version-number before continued editing
      project.version = payload.version + 1;

      if (!project.publications) project.publications = [];

      project.publications?.push(payload);
    },
    editNeed(state, { payload }: PayloadAction<number>) {
      state.selectedNeed = payload;
    },
    editRequirementToSelected(
      state,
      {
        payload
      }: PayloadAction<{
        requirement: Requirement;
        needIndex: number;
        requirementIndex: number;
      }>
    ) {
      if (
        state.selectedProject?.needs[payload.needIndex]?.requirements[
          payload.requirementIndex
        ]
      ) {
        state.selectedProject.needs[payload.needIndex].requirements[
          payload.requirementIndex
        ] = payload.requirement;
      }
    },
    addRequirementToSelectedNeed(
      state,
      {
        payload
      }: PayloadAction<{ requirement: Requirement; needIndex: number }>
    ) {
      state.selectedProject?.needs[payload.needIndex].requirements.push(
        payload.requirement
      );
    },
    addNeed(state, { payload }: PayloadAction<Need>) {
      const id = state.selectedProject?.id;
      if (id !== undefined) {
        state.projects[id].needs.push(payload);
      }
    },
    addSubNeed(state, { payload }: PayloadAction<Need>) {
      const needId = state.selectedNeed;
      const kravbankId = state.selectedProject?.id;
      if (kravbankId !== undefined) {
        state.projects[kravbankId].needs[needId].needs?.push(payload);
      }
    },

    addCodelist(state, { payload }: PayloadAction<Codelist>) {
      state.codelists.push(payload);
    },
    selectCodelist(state, { payload }: PayloadAction<number>) {
      state.selectedCodelist = payload;
    },
    editCodelist(state, { payload }: PayloadAction<Codelist>) {
      const codelistindex = state.codelists.findIndex(
        (codelist) => codelist.id === state.selectedCodelist
      );
      state.codelists[codelistindex] = payload;
    },
    addCode(state, { payload }: PayloadAction<Code>) {
      // TODO: find more suitable place to perform this action
      const codelistindex = state.codelists.findIndex(
        (codelist) => codelist.id === state.selectedCodelist
      );
      state.codelists[codelistindex].codes.push(payload);
    },
    editCode(state, { payload }: PayloadAction<Code>) {
      // todo: move to more suitable and less repetetive place
      const listindex = state.codelists.findIndex(
        (codelist) => codelist.id === state.selectedCodelist
      );
      const codeindex = state.codelists[listindex].codes.findIndex(
        (code) => code.id === payload.id
      );
      state.codelists[listindex].codes[codeindex] = payload;
    },
    addProduct(state, { payload }: PayloadAction<Product>) {
      state.products.push(payload);
    },
    editProduct(state, { payload }: PayloadAction<Product>) {
      const productindex = state.products.findIndex(
        (product) => product.id === payload.id
      );
      state.products[productindex] = payload;
    },
    banksReceived(state, { payload }: PayloadAction<Bank[]>) {
      state.projects = payload;
    }
  },
  extraReducers: () => {}
});

export const {
  addBanks,
  addProject,
  editNeed,
  editProject,
  publishProject,
  editRequirementToSelected,
  addNeed,
  addSubNeed,
  addRequirementToSelectedNeed,
  addCodelist,
  addCode,
  editCodelist,
  selectCodelist,
  editCode,
  editProduct,
  addProduct,
  banksReceived,
  selectBank
} = kravbankSlice.actions;

export default kravbankSlice.reducer;
