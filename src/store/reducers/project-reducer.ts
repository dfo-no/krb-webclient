/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { del, get, post, put } from '../../api/http';
import Utils from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import { Need } from '../../models/Need';
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

export const getProjectThunk = createAsyncThunk(
  'getProjectThunk',
  async (id: string) => {
    const response = await get<Bank[]>(`http://localhost:3001/projects/${id}`);
    return response.data;
  }
);

export const getProjectsThunk = createAsyncThunk(
  'getProjectsThunk',
  async () => {
    const response = await get<Bank[]>(`http://localhost:3001/projects`);
    return response.data;
  }
);

export const postProjectThunk = createAsyncThunk(
  'postProjectThunk',
  async (project: Bank) => {
    const response = await post<Bank>(
      `http://localhost:3001/projects`,
      project
    );
    return response.data;
  }
);

export const putProjectThunk = createAsyncThunk<
  Bank,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('putProjectThunk', async (projectId: string, thunkApi) => {
  const project = Utils.ensure(
    thunkApi
      .getState()
      .project.list.find((element: Bank) => element.id === projectId)
  );
  const response = await put<Bank>(
    `http://localhost:3001/projects/${project.id}`,
    project
  );
  return response.data as Bank;
});

export const deleteProjectThunk = createAsyncThunk(
  'deleteProjectThunk',
  async (project: Bank) => {
    const response = await del(`http://localhost:3001/projects/${project.id}`, {
      method: 'DELETE'
    });
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'Projects',
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
    addNeed(state, { payload }: PayloadAction<{ id: string; need: Need }>) {
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
    editProduct(
      state,
      {
        payload
      }: PayloadAction<{
        projectId: string;
        productId: string;
        title: string;
        description: string;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const productindex = state.list[projectIndex].products.findIndex(
        (product) => product.id === payload.productId
      );

      state.list[projectIndex].products[productindex].title = payload.title;
      state.list[projectIndex].products[productindex].description =
        payload.description;
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
        needIndex: number;
        reqId: string;
        requirement: Requirement;
      }>
    ) {
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.projectId)
      );
      const needIndex = Utils.ensure(
        state.list[projectIndex].needs[
          payload.needIndex
        ].requirements.findIndex((req) => req.id === payload.reqId)
      );
      state.list[projectIndex].needs[payload.needIndex].requirements[
        needIndex
      ] = payload.requirement;
    },
    editRequirement(
      state,
      {
        payload
      }: PayloadAction<{
        id: string;
        requirement: Requirement;
        needIndex: number;
        requirementIndex: number;
      }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].needs[payload.needIndex].requirements[
        payload.requirementIndex
      ] = payload.requirement;
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectThunk.fulfilled, () => {});
    builder.addCase(getProjectThunk.pending, () => {});
    builder.addCase(getProjectThunk.rejected, () => {});
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
    builder.addCase(deleteProjectThunk.fulfilled, (state) => {
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
  editProduct,
  addCode,
  addCodeToCodelist,
  editCodeInCodelist,
  addPublication,
  incrementProjectVersion,
  addNeed,
  editNeed,
  editCode,
  editCodelist,
  publishProject,
  editProject,
  setRequirementListToNeed,
  editRequirementInNeed,
  editRequirement,
  addRequirement
} = projectSlice.actions;

export default projectSlice.reducer;
