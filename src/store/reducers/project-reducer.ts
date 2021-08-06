/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../../api/http';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Product } from '../../models/Product';
import { Publication } from '../../models/Publication';
import { Requirement } from '../../models/Requirement';
// eslint-disable-next-line import/no-cycle
import { AppDispatch, RootState } from '../store';

interface ProjectState {
  list: Bank[];
  status: 'idle' | 'fulfilled' | 'rejected' | 'pending';
}

const initialState: ProjectState = {
  list: [],
  status: 'idle'
};

// this, this is the one
export const getProjectsThunk = createAsyncThunk(
  'getProjectsThunk',
  async () => {
    const response = await httpGet<Bank[]>('/api/bank/projects');
    return response.data;
  }
);

export const postProjectThunk = createAsyncThunk(
  'postProjectThunk',
  async (project: Bank) => {
    const response = await httpPost<Bank>('/api/bank', project);
    return response.data;
  }
);

export const putProjectByIdThunk = createAsyncThunk<
  Bank,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('putProjectByIdThunk', async (projectId: string, thunkApi) => {
  // get updated project from redux
  const project = Utils.ensure(
    thunkApi
      .getState()
      .project.list.find((element: Bank) => element.id === projectId)
  );
  const response = await httpPut<Bank>(`/api/bank/${project.id}`, project);
  return response.data;
});

export const putProjectThunk = createAsyncThunk(
  'putProjectThunk',
  async (project: Bank) => {
    const response = await httpPut<Bank>(`/api/bank/${project.id}`, project);
    return response.data;
  }
);

export const deleteProjectThunk = createAsyncThunk(
  'deleteProjectThunk',
  async (project: Bank) => {
    await httpDelete<Bank>(`/api/bank/${project.id}`);
    return project;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjects(state, { payload }: PayloadAction<Bank[]>) {
      state.list = payload;
    },

    // Should not be needed, when removing, we reload the list
    deleteProject(state, { payload }: PayloadAction<Bank>) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    },
    editProject(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        title: string;
        description: string;
      }>
    ) {
      const projectIndex = state.list.findIndex(
        (project) => project.id === payload.projectId
      );
      state.list[projectIndex].title = payload.title;
      state.list[projectIndex].description = payload.description;
    },
    incrementProjectVersion(state, { payload }: PayloadAction<string>) {
      const projectIndex = state.list.findIndex(
        (project) => project.id === payload
      );
      state.list[projectIndex].version += 1;
    },
    addPublication(
      state,
      {
        payload
      }: PayloadAction<{ projectId: string; publication: Publication }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );

      if (!state.list[projectIndex].publications) {
        state.list[projectIndex].publications = [];
      }
      state.list[projectIndex].publications?.push(payload.publication);
    },
    publishProject(
      state,
      { payload }: PayloadAction<{ id: string; publication: Publication }>
    ) {
      const index = state.list.findIndex(
        (project) => project.id === payload.id
      );
      state.list[index].version += 1;

      if (!state.list[index].publications) state.list[index].publications = [];

      state.list[index].publications?.push(payload.publication);
    },
    updateNeedList(
      state,
      { payload }: PayloadAction<{ id: string; needs: Nestable<Need>[] }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].needs = payload.needs;
    },
    addNeed(
      state,
      { payload }: PayloadAction<{ id: string; need: Nestable<Need> }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[projectIndex].needs.push(payload.need);
    },
    editNeed(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        needId: string;
        title: string;
        description: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const needIndex = Utils.ensure(
        state.list[projectIndex].needs.findIndex(
          (need) => need.id === payload.needId
        )
      );

      state.list[projectIndex].needs[needIndex].title = payload.title;
      state.list[projectIndex].needs[needIndex].description =
        payload.description;
    },
    deleteNeed(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        needId: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const needindex = state.list[projectIndex].needs.findIndex(
        (need) => need.id === payload.needId
      );

      state.list[projectIndex].needs.splice(needindex, 1);
    },
    addCodelist(
      state,
      { payload }: PayloadAction<{ id: string; codelist: Codelist }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].codelist.push(payload.codelist);
    },
    addProduct(
      state,
      { payload }: PayloadAction<{ id: string; product: Product }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].products.push(payload.product);
    },
    updateProductList(
      state,
      { payload }: PayloadAction<{ id: string; products: Product[] }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].products = payload.products;
    },
    editProduct(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        product: Product;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const productindex = state.list[projectIndex].products.findIndex(
        (product) => product.id === payload.product.id
      );

      state.list[projectIndex].products[productindex] = payload.product;
    },
    deleteProduct(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        productId: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const productindex = state.list[projectIndex].products.findIndex(
        (product) => product.id === payload.productId
      );

      state.list[projectIndex].products.splice(productindex, 1);
    },
    updateCodeList(
      state,
      {
        payload
      }: PayloadAction<{ id: string; codelistId: string; codes: Code[] }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      const codeListIndex = state.list[index].codelist.findIndex(
        (codelist) => codelist.id === payload.codelistId
      );
      state.list[index].codelist[codeListIndex].codes = payload.codes;
    },
    editCodelist(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        codelistId: string;
        title: string;
        description: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const codeListIndex = state.list[projectIndex].codelist.findIndex(
        (codelist) => codelist.id === payload.codelistId
      );
      state.list[projectIndex].codelist[codeListIndex].title = payload.title;
      state.list[projectIndex].codelist[codeListIndex].description =
        payload.description;
    },
    deleteCodelist(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        codelistId: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const codeListIndex = state.list[projectIndex].codelist.findIndex(
        (codelist) => codelist.id === payload.codelistId
      );
      state.list[projectIndex].codelist.splice(codeListIndex, 1);
    },

    editCodeInCodelist(
      state,
      {
        payload
      }: PayloadAction<{ projectId: string; codelistId: string; code: Code }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const codelistIndex = Utils.ensure(
        state.list[projectIndex].codelist.findIndex(
          (codelist) => codelist.id === payload.codelistId
        )
      );
      const codeIndex = Utils.ensure(
        state.list[projectIndex].codelist[codelistIndex].codes.findIndex(
          (code) => code.id === payload.code.id
        )
      );
      state.list[projectIndex].codelist[codelistIndex].codes[codeIndex].title =
        payload.code.title;
      state.list[projectIndex].codelist[codelistIndex].codes[
        codeIndex
      ].description = payload.code.description;
    },

    addCodeToCodelist(
      state,
      {
        payload
      }: PayloadAction<{ projectId: string; codelistId: string; code: Code }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const codelistIndex = Utils.ensure(
        state.list[projectIndex].codelist.findIndex(
          (codelist) => codelist.id === payload.codelistId
        )
      );
      state.list[projectIndex].codelist[codelistIndex].codes.push(payload.code);
    },
    deleteCodeInCodelist(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        codelistId: string;
        codeId: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const codelistIndex = Utils.ensure(
        state.list[projectIndex].codelist.findIndex(
          (codelist) => codelist.id === payload.codelistId
        )
      );
      const codeIndex = Utils.ensure(
        state.list[projectIndex].codelist[codelistIndex].codes.findIndex(
          (code) => code.id === payload.codeId
        )
      );
      state.list[projectIndex].codelist[codelistIndex].codes.splice(
        codeIndex,
        1
      );
    },
    addCode(
      state,
      { payload }: PayloadAction<{ id: string; code: Code; codeListId: string }>
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
      { payload }: PayloadAction<{ id: string; code: Code; codeListId: string }>
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
    setRequirementListToNeed(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        needIndex: number;
        reqList: Requirement[];
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      state.list[projectIndex].needs[payload.needIndex].requirements =
        payload.reqList;
    },
    editRequirementInNeed(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        requirement: Requirement;
        oldNeedId: string;
        needId: string;
        requirementIndex: number;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const needIndex = Utils.ensure(
        state.list[projectIndex].needs.findIndex(
          (need) => need.id === payload.needId
        )
      );
      const oldNeedIndex = Utils.ensure(
        state.list[projectIndex].needs.findIndex(
          (need) => need.id === payload.oldNeedId
        )
      );
      state.list[projectIndex].needs[oldNeedIndex].requirements.splice(
        payload.requirementIndex,
        1
      );

      state.list[projectIndex].needs[needIndex].requirements.push(
        payload.requirement
      );
    },
    addRequirement(
      state,
      {
        payload
      }: PayloadAction<{
        id: string;
        requirement: Requirement;
        needIndex: number;
      }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].needs[payload.needIndex].requirements.push(
        payload.requirement
      );
    },
    deleteRequirement(
      state,
      {
        payload
      }: PayloadAction<{
        id: string;
        needIndex: number;
        requirementIndex: number;
      }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].needs[payload.needIndex].requirements.splice(
        payload.requirementIndex,
        1
      );
    },
    deletePublication(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        publicationId: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const publicationIndex = state.list[projectIndex].publications.findIndex(
        (p) => p.id === payload.publicationId
      );

      state.list[projectIndex].publications.splice(publicationIndex, 1);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getProjectsThunk.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getProjectsThunk.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(postProjectThunk.fulfilled, (state, { payload }) => {
      state.list.push(payload);
      state.status = 'fulfilled';
    });
    builder.addCase(postProjectThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(postProjectThunk.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(putProjectByIdThunk.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[projectIndex] = payload;
    });
    builder.addCase(putProjectByIdThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(putProjectByIdThunk.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(putProjectThunk.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[projectIndex] = payload;
    });
    builder.addCase(putProjectThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(putProjectThunk.rejected, (state) => {
      state.status = 'rejected';
    });
    builder.addCase(deleteProjectThunk.fulfilled, (state, { payload }) => {
      state.list = state.list.filter((item) => item.id !== payload.id);
      state.status = 'fulfilled';
    });
    builder.addCase(deleteProjectThunk.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(deleteProjectThunk.rejected, (state) => {
      state.status = 'rejected';
    });
  }
});

export const {
  addProjects,
  deleteProject,
  addCodelist,
  addProduct,
  updateProductList,
  updateNeedList,
  editProduct,
  deleteProduct,
  addCode,
  updateCodeList,
  deleteCodelist,
  addCodeToCodelist,
  editCodeInCodelist,
  deleteCodeInCodelist,
  addPublication,
  incrementProjectVersion,
  addNeed,
  editNeed,
  deleteNeed,
  editCode,
  editCodelist,
  publishProject,
  editProject,
  setRequirementListToNeed,
  editRequirementInNeed,
  addRequirement,
  deleteRequirement,
  deletePublication
} = projectSlice.actions;

export default projectSlice.reducer;
