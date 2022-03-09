import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpGet } from '../../api/http';
import Utils from '../../common/Utils';
import { IInheritedBank } from '../../models/IInheritedBank';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';
import { IBank } from '../../Nexus/entities/IBank';
import { ICode } from '../../Nexus/entities/ICode';
import { ICodelist } from '../../Nexus/entities/ICodelist';
import { INeed } from '../../Nexus/entities/INeed';
import { IProduct } from '../../Nexus/entities/IProduct';
import { IPublication } from '../../Nexus/entities/IPublication';
import { IRequirement } from '../../Nexus/entities/IRequirement';
import { ITag } from '../../Nexus/entities/ITag';

interface IProjectState {
  list: IBank[];
  listLoading: 'idle' | 'fulfilled' | 'rejected' | 'pending';
  project: IBank;
  projectLoading: 'idle' | 'fulfilled' | 'rejected' | 'pending';
}

const initialState: IProjectState = {
  list: [],
  project: {
    id: '',
    title: '',
    description: '',
    needs: [],
    codelist: [],
    products: [],
    tags: [],
    publications: [],
    type: ModelType.bank,
    version: 0,
    inheritedBanks: [],
    publishedDate: null,
    sourceOriginal: null,
    sourceRel: null,
    projectId: null
  },
  projectLoading: 'idle',
  listLoading: 'idle'
};

export const getProjectsThunk = createAsyncThunk(
  'getProjectsThunk',
  async () => {
    const response = await httpGet<IBank[]>('/api/bank/projects');
    return response.data;
  }
);

export const getProjectThunk = createAsyncThunk(
  'getProjectThunk',
  async (id: string) => {
    const response = await httpGet<IBank>(`/api/bank/${id}`);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjects(state, { payload }: PayloadAction<IBank[]>) {
      state.list = payload;
    },
    selectProject(state, { payload }: PayloadAction<IBank>) {
      state.project = payload;
    },
    // Should not be needed, when removing, we reload the list
    deleteProject(state, { payload }: PayloadAction<IBank>) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    incrementProjectVersion(state, { payload }: PayloadAction<string>) {
      const projectIndex = state.list.findIndex(
        (project) => project.id === payload
      );
      state.list[projectIndex].version += 1;
    },
    prependPublication(state, { payload }: PayloadAction<IPublication>) {
      state.project.publications.push(payload);
    },
    publishProject(
      state,
      { payload }: PayloadAction<{ id: string; publication: IPublication }>
    ) {
      const index = state.list.findIndex(
        (project) => project.id === payload.id
      );
      state.list[index].version += 1;

      if (!state.list[index].publications) state.list[index].publications = [];

      state.list[index].publications?.push(payload.publication);
    },
    setNeeds(state, { payload }: PayloadAction<Parentable<INeed>[]>) {
      state.project.needs = payload;
    },
    addNeed(state, { payload }: PayloadAction<Parentable<INeed>>) {
      state.project.needs.push(payload);
    },
    editNeed(state, { payload }: PayloadAction<Parentable<INeed>>) {
      const needIndex = state.project.needs.findIndex(
        (elem) => elem.id === payload.id
      );
      if (needIndex !== -1) {
        state.project.needs[needIndex] = payload;
      }
    },
    deleteNeed(state, { payload }: PayloadAction<INeed>) {
      const needIndex = state.project.needs.findIndex(
        (need) => need.id === payload.id
      );
      if (needIndex !== -1) {
        state.project.needs.splice(needIndex, 1);
      }
    },
    addCodelist(state, { payload }: PayloadAction<ICodelist>) {
      state.project.codelist.push(payload);
    },
    addProduct(state, { payload }: PayloadAction<IProduct>) {
      state.project.products.push(payload);
    },
    updateProductList(state, { payload }: PayloadAction<IProduct[]>) {
      state.project.products = payload;
    },
    editProduct(state, { payload }: PayloadAction<IProduct>) {
      const productIndex = state.project.products.findIndex(
        (elem) => elem.id === payload.id
      );
      if (productIndex !== -1) {
        state.project.products[productIndex] = payload;
      }
    },
    removeProduct(state, { payload }: PayloadAction<IProduct>) {
      const productindex = state.project.products.findIndex(
        (elem) => elem.id === payload.id
      );
      if (productindex !== -1) {
        state.project.products.splice(productindex, 1);
      }
    },
    setCodes(
      state,
      {
        payload
      }: PayloadAction<{
        codelistId: string;
        codes: Parentable<ICode>[];
      }>
    ) {
      const codelistIndex = state.project.codelist.findIndex(
        (c) => c.id === payload.codelistId
      );
      if (codelistIndex !== -1) {
        state.project.codelist[codelistIndex].codes = payload.codes;
      }
    },
    editSelectedCodelist(state, { payload }: PayloadAction<ICodelist>) {
      const index = state.project.codelist.findIndex(
        (codelist) => codelist.id === payload.id
      );
      if (index !== -1) {
        state.project.codelist[index] = payload;
      }
    },
    deleteCodelist(state, { payload }: PayloadAction<ICodelist>) {
      const index = state.project.codelist.findIndex(
        (codelist) => codelist.id === payload.id
      );
      if (index !== -1) {
        state.project.codelist.splice(index, 1);
      }
    },

    editCodeInCodelist(
      state,
      {
        payload
      }: PayloadAction<{ codelistId: string; code: Parentable<ICode> }>
    ) {
      const codelistIndex = state.project.codelist.findIndex(
        (codelist) => codelist.id === payload.codelistId
      );
      if (codelistIndex !== -1) {
        const codeIndex = state.project.codelist[codelistIndex].codes.findIndex(
          (code) => code.id === payload.code.id
        );
        if (codeIndex !== -1) {
          state.project.codelist[codelistIndex].codes[codeIndex] = payload.code;
        }
      }
    },

    addCodeToCodelist(
      state,
      {
        payload
      }: PayloadAction<{ codelistId: string; code: Parentable<ICode> }>
    ) {
      const index = state.project.codelist.findIndex(
        (codelist) => codelist.id === payload.codelistId
      );
      if (index !== -1) {
        state.project.codelist[index].codes.push(payload.code);
      }
    },
    removeCode(
      state,
      {
        payload
      }: PayloadAction<{
        codelistId: string;
        code: ICode;
      }>
    ) {
      const codelistIndex = state.project.codelist.findIndex(
        (elem) => elem.id === payload.codelistId
      );
      if (codelistIndex !== -1) {
        const codeIndex = state.project.codelist[codelistIndex].codes.findIndex(
          (elem) => elem.id === payload.code.id
        );
        if (codeIndex !== -1) {
          state.project.codelist[codelistIndex].codes.splice(codeIndex, 1);
        }
      }
    },
    addCode(
      state,
      {
        payload
      }: PayloadAction<{
        id: string;
        code: Parentable<ICode>;
        codeListId: string;
      }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      const codeListIndex = state.list[index].codelist.findIndex(
        (codelist) => codelist.id === payload.codeListId
      );

      state.list[index].codelist[codeListIndex].codes.push(payload.code);
    },
    editCode(
      state,
      {
        payload
      }: PayloadAction<{
        id: string;
        code: Parentable<ICode>;
        codeListId: string;
      }>
    ) {
      // todo: move to more suitable and less repetetive place
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      const codeListIndex = state.list[index].codelist.findIndex(
        (codelist) => codelist.id === payload.codeListId
      );
      const codeIndex = state.list[index].codelist[
        codeListIndex
      ].codes.findIndex((code) => code.id === payload.code.id);

      state.list[index].codelist[codeListIndex].codes[codeIndex] = payload.code;
    },
    editRequirementPublication(
      state,
      { payload }: PayloadAction<IPublication>
    ) {
      const index = state.project.publications.findIndex(
        (element) => payload.id === element.id
      );
      if (index !== -1) {
        state.project.publications[index].comment = payload.comment;
      }
    },
    editRequirementInNeed(
      state,
      {
        payload
      }: PayloadAction<{
        needId: string;
        requirement: IRequirement;
      }>
    ) {
      const needIndex = state.project.needs.findIndex(
        (need) => need.id === payload.needId
      );

      if (needIndex !== -1) {
        const requirementIndex = state.project.needs[
          needIndex
        ].requirements.findIndex((elem) => elem.id === payload.requirement.id);
        if (requirementIndex !== -1) {
          state.project.needs[needIndex].requirements[requirementIndex] =
            payload.requirement;
        }
      }
    },
    addRequirementToNeed(
      state,
      {
        payload
      }: PayloadAction<{
        needId: string;
        requirement: IRequirement;
      }>
    ) {
      const needIndex = state.project.needs.findIndex(
        (elem) => elem.id === payload.needId
      );
      if (needIndex !== -1) {
        state.project.needs[needIndex].requirements.unshift(
          payload.requirement
        );
      }
    },
    deleteRequirement(
      state,
      { payload }: PayloadAction<{ needId: string; requirement: IRequirement }>
    ) {
      const needIndex = state.project.needs.findIndex(
        (elem) => elem.id === payload.needId
      );
      if (needIndex !== -1) {
        const requirementIndex = state.project.needs[
          needIndex
        ].requirements.findIndex(
          (element) => element.id === payload.requirement.id
        );
        if (requirementIndex !== -1) {
          state.project.needs[needIndex].requirements.splice(
            requirementIndex,
            1
          );
        }
      }
    },
    editPublication(state, { payload }: PayloadAction<IPublication>) {
      const index = state.project.publications.findIndex(
        (element) => payload.id === element.id
      );
      if (index !== -1) {
        state.project.publications[index].comment = payload.comment;
      }
    },
    removePublication(state, { payload }: PayloadAction<string>) {
      const index = state.project.publications.findIndex(
        (element) => payload === element.id
      );
      if (index !== -1) {
        state.project.publications.splice(index, 1);
      }
    },
    updateSelectedVersion(state, { payload }: PayloadAction<number>) {
      state.project.version = payload;
    },
    addTag(state, { payload }: PayloadAction<Parentable<ITag>>) {
      state.project.tags.push(payload);
    },
    editTag(state, { payload }: PayloadAction<Parentable<ITag>>) {
      const index = state.project.tags.findIndex(
        (element) => payload.id === element.id
      );
      state.project.tags[index] = payload;
    },
    removeTag(state, { payload }: PayloadAction<Parentable<ITag>>) {
      const index = state.project.tags.findIndex(
        (element) => payload.id === element.id
      );
      if (index !== -1) {
        state.project.tags.splice(index, 1);
      }
    },
    addInheritedBank(state, { payload }: PayloadAction<IInheritedBank>) {
      state.project.inheritedBanks.push(payload);
    },
    setTags(state, { payload }: PayloadAction<Parentable<ITag>[]>) {
      state.project.tags = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsThunk.pending, (state) => {
      state.listLoading = 'pending';
    });
    builder.addCase(getProjectsThunk.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.listLoading = 'fulfilled';
    });
    builder.addCase(getProjectsThunk.rejected, (state) => {
      state.listLoading = 'rejected';
    });
    builder.addCase(getProjectThunk.pending, (state) => {
      state.projectLoading = 'pending';
    });
    builder.addCase(getProjectThunk.fulfilled, (state, { payload }) => {
      state.project = payload;
      state.projectLoading = 'fulfilled';
    });
    builder.addCase(getProjectThunk.rejected, (state) => {
      state.projectLoading = 'rejected';
    });
  }
});

export const {
  addProjects,
  deleteProject,
  addCodelist,
  addProduct,
  updateProductList,
  setNeeds,
  editProduct,
  removeProduct,
  addCode,
  setCodes,
  deleteCodelist,
  addCodeToCodelist,
  editCodeInCodelist,
  removeCode,
  prependPublication,
  incrementProjectVersion,
  addNeed,
  editNeed,
  deleteNeed,
  editCode,
  editSelectedCodelist,
  publishProject,
  editRequirementInNeed,
  addRequirementToNeed,
  deleteRequirement,
  removePublication,
  updateSelectedVersion,
  selectProject,
  editPublication,
  addTag,
  editTag,
  removeTag,
  addInheritedBank,
  setTags
} = projectSlice.actions;

export default projectSlice.reducer;
