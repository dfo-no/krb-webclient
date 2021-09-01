import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../../api/http';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import ModelType from '../../models/ModelType';
import { Need } from '../../models/Need';
import { Nestable } from '../../models/Nestable';
import { Product } from '../../models/Product';
import { Publication } from '../../models/Publication';
import { Requirement } from '../../models/Requirement';

interface ProjectState {
  list: Bank[];
  listLoading: 'idle' | 'fulfilled' | 'rejected' | 'pending';
  project: Bank;
  projectLoading: 'idle' | 'fulfilled' | 'rejected' | 'pending';
}

const initialState: ProjectState = {
  list: [],
  project: {
    id: '',
    title: '',
    description: '',
    needs: [],
    codelist: [],
    products: [],
    publications: [],
    type: ModelType.bank,
    version: 0
  },
  projectLoading: 'idle',
  listLoading: 'idle'
};

export const getProjectsThunk = createAsyncThunk(
  'getProjectsThunk',
  async () => {
    const response = await httpGet<Bank[]>('/api/bank/projects');

    return response.data;
  }
);

export const getProjectThunk = createAsyncThunk(
  'getProjectThunk',
  async (id: string) => {
    const response = await httpGet<Bank>(`/api/bank/${id}`);
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

/**
 * @deprecated Use putSelectedProjectThunk instead
 */
export const putProjectByIdThunk = createAsyncThunk<
  Bank,
  string,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any;
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

export const putSelectedProjectThunk = createAsyncThunk<
  Bank,
  string,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: any; // do not use : RootState here. Circular reference!!
  }
>('putSelectedProjectThunk', async (id: string, thunkApi) => {
  const { project } = thunkApi.getState().project as ProjectState;
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

export const deleteProjectByIdThunk = createAsyncThunk(
  'deleteProjectByIdThunk',
  async (projectId: string) => {
    await httpDelete<Bank>(`/api/bank/${projectId}`);
    return projectId;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProjects(state, { payload }: PayloadAction<Bank[]>) {
      state.list = payload;
    },
    selectProject(state, { payload }: PayloadAction<Bank>) {
      state.project = payload;
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
    incrementProjectVersion(state, { payload }: PayloadAction<string>) {
      const projectIndex = state.list.findIndex(
        (project) => project.id === payload
      );
      state.list[projectIndex].version += 1;
    },
    prependPublication(state, { payload }: PayloadAction<Publication>) {
      state.project.publications.push(payload);
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
    addCodelist(state, { payload }: PayloadAction<Codelist>) {
      state.project.codelist.push(payload);
    },
    addProduct(state, { payload }: PayloadAction<Product>) {
      state.project.products.push(payload);
    },
    updateProductList(state, { payload }: PayloadAction<Product[]>) {
      state.project.products = payload;
    },
    editProduct(state, { payload }: PayloadAction<Product>) {
      const productIndex = state.project.products.findIndex(
        (elem) => elem.id === payload.id
      );
      if (productIndex !== -1) {
        state.project.products[productIndex] = payload;
      }
    },
    removeProduct(state, { payload }: PayloadAction<Product>) {
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
      }: PayloadAction<{ id: string; codelistId: string; codes: Code[] }>
    ) {
      const codelistIndex = state.project.codelist.findIndex(
        (c) => c.id === payload.codelistId
      );
      if (codelistIndex !== -1) {
        state.project.codelist[codelistIndex].codes = payload.codes;
      }
    },
    editSelectedCodelist(state, { payload }: PayloadAction<Codelist>) {
      const index = state.project.codelist.findIndex(
        (codelist) => codelist.id === payload.id
      );
      if (index !== -1) {
        state.project.codelist[index] = payload;
      }
    },
    deleteCodelist(state, { payload }: PayloadAction<Codelist>) {
      const index = state.project.codelist.findIndex(
        (codelist) => codelist.id === payload.id
      );
      if (index !== -1) {
        state.project.codelist.splice(index, 1);
      }
    },

    editCodeInCodelist(
      state,
      { payload }: PayloadAction<{ codelistId: string; code: Code }>
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
      { payload }: PayloadAction<{ codelistId: string; code: Code }>
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
        code: Code;
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
    editPublication(state, { payload }: PayloadAction<Publication>) {
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
    builder.addCase(postProjectThunk.fulfilled, (state, { payload }) => {
      state.list.push(payload);
      state.projectLoading = 'fulfilled';
    });
    builder.addCase(postProjectThunk.pending, (state) => {
      state.projectLoading = 'pending';
    });
    builder.addCase(postProjectThunk.rejected, (state) => {
      state.projectLoading = 'rejected';
    });
    builder.addCase(putProjectByIdThunk.fulfilled, (state, { payload }) => {
      // update project in list if it exists there
      const projectIndex = state.list.findIndex(
        (project) => project.id === payload.id
      );
      if (projectIndex) {
        state.list[projectIndex] = payload;
      }
      // ux-assume that since we update the project, it is selected. Update it.
      state.project = payload;
      state.projectLoading = 'fulfilled';
    });
    builder.addCase(putProjectByIdThunk.pending, (state) => {
      state.projectLoading = 'pending';
    });
    builder.addCase(putProjectByIdThunk.rejected, (state) => {
      state.projectLoading = 'rejected';
    });
    builder.addCase(putProjectThunk.fulfilled, (state, { payload }) => {
      state.project = payload;
      state.projectLoading = 'fulfilled';
    });
    builder.addCase(putProjectThunk.pending, (state) => {
      state.projectLoading = 'pending';
    });
    builder.addCase(putProjectThunk.rejected, (state) => {
      state.projectLoading = 'rejected';
    });
    builder.addCase(deleteProjectThunk.fulfilled, (state, { payload }) => {
      state.list = state.list.filter((item) => item.id !== payload.id);

      // if deleted project is the current selected, set project back to default
      if (state.project.id === payload.id) {
        state.project = initialState.project;
      }

      state.projectLoading = 'fulfilled';
    });
    builder.addCase(deleteProjectThunk.pending, (state) => {
      state.projectLoading = 'pending';
    });
    builder.addCase(deleteProjectThunk.rejected, (state) => {
      state.projectLoading = 'rejected';
    });
    builder.addCase(deleteProjectByIdThunk.fulfilled, (state, { payload }) => {
      state.list = state.list.filter((item) => item.id !== payload);
      state.projectLoading = 'fulfilled';
    });
    builder.addCase(deleteProjectByIdThunk.pending, (state) => {
      state.projectLoading = 'pending';
    });
    builder.addCase(deleteProjectByIdThunk.rejected, (state) => {
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
  updateNeedList,
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
  setRequirementListToNeed,
  editRequirementInNeed,
  addRequirement,
  deleteRequirement,
  removePublication,
  updateSelectedVersion,
  selectProject,
  editPublication
} = projectSlice.actions;

export default projectSlice.reducer;
