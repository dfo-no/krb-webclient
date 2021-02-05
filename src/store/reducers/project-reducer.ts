import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { del, get, post, put } from '../../api/http';
import { Utils } from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import { Need } from '../../models/Need';
import { Product } from '../../models/Product';
import { Publication } from '../../models/Publication';
import { Requirement } from '../../models/Requirement';
import { RootState } from '../rootReducer';
import { AppDispatch } from '../store';

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
  async (id: number) => {
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
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('putProjectThunk', async (projectId: number, thunkApi) => {
  /* We cannot save project param directly becasue it is a reference to the project
     before we updated it. We must fetch the project from the store, where it *is* updated.
     Therefore we just send in the id of the project, as sending in the reference would be useless.
  */
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
    editProject(state, { payload }: PayloadAction<Bank>) {
      const index = state.list.findIndex(
        (project) => project.id === payload.id
      );
      state.list[index] = payload;
    },

    publishProject(
      state,
      { payload }: PayloadAction<{ id: number; publication: Publication }>
    ) {
      const index = state.list.findIndex(
        (project) => project.id === payload.id
      );
      state.list[index].version += 1;

      if (!state.list[index].publications) state.list[index].publications = [];

      state.list[index].publications?.push(payload.publication);
    },
    addNeed(state, { payload }: PayloadAction<{ id: number; need: Need }>) {
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
        projectId: number;
        needId: number;
        tittel: string;
        beskrivelse: string;
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

      state.list[projectIndex].needs[needIndex].tittel = payload.tittel;
      state.list[projectIndex].needs[needIndex].beskrivelse =
        payload.beskrivelse;
    },
    addCodeList(
      state,
      { payload }: PayloadAction<{ id: number; codelist: Codelist }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].codelist.push(payload.codelist);
    },
    addProduct(
      state,
      { payload }: PayloadAction<{ id: number; product: Product }>
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
        projectId: number;
        productId: number;
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
      }: PayloadAction<{ id: number; codeList: Codelist; codeListId: number }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      let codeListIndex = state.list[index].codelist.findIndex(
        (codelist) => codelist.id === payload.codeListId
      );
      state.list[index].codelist[codeListIndex] = payload.codeList;
    },
    addCode(
      state,
      { payload }: PayloadAction<{ id: number; code: Code; codeListId: number }>
    ) {
      //TODO: find more suitable place to perform this action
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      let codeListIndex = state.list[index].codelist.findIndex(
        (codelist) => codelist.id === payload.codeListId
      );

      state.list[index].codelist[codeListIndex].codes.push(payload.code);
    },
    editCode(
      state,
      { payload }: PayloadAction<{ id: number; code: Code; codeListId: number }>
    ) {
      //todo: move to more suitable and less repetetive place
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      let codeListIndex = state.list[index].codelist.findIndex(
        (codelist) => codelist.id === payload.codeListId
      );
      let codeIndex = state.list[index].codelist[codeListIndex].codes.findIndex(
        (code) => code.id === payload.code.id
      );

      state.list[index].codelist[codeListIndex].codes[codeIndex] = payload.code;
    },
    editRequirement(
      state,
      {
        payload
      }: PayloadAction<{
        id: number;
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
        id: number;
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
    builder.addCase(getProjectThunk.fulfilled, (state, { payload }) => {});
    builder.addCase(getProjectThunk.pending, (state, { payload }) => {});
    builder.addCase(getProjectThunk.rejected, (state, { payload }) => {});
    builder.addCase(getProjectsThunk.pending, (state, { payload }) => {
      state.status = 'pending';
    });
    builder.addCase(getProjectsThunk.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.status = 'fulfilled';
    });
    builder.addCase(getProjectsThunk.rejected, (state, { payload }) => {
      state.status = 'rejected';
    });
    builder.addCase(postProjectThunk.fulfilled, (state, { payload }) => {
      state.list.push(payload);
      state.status = 'fulfilled';
    });
    builder.addCase(postProjectThunk.pending, (state, { payload }) => {
      state.status = 'pending';
    });
    builder.addCase(postProjectThunk.rejected, (state, { payload }) => {
      state.status = 'rejected';
    });
    builder.addCase(putProjectThunk.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
      const projectIndex = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[projectIndex] = payload;
    });
    builder.addCase(putProjectThunk.pending, (state, { payload }) => {
      state.status = 'pending';
    });
    builder.addCase(putProjectThunk.rejected, (state, { payload }) => {
      state.status = 'rejected';
    });
    builder.addCase(deleteProjectThunk.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
    });
    builder.addCase(deleteProjectThunk.pending, (state, { payload }) => {
      state.status = 'pending';
    });
    builder.addCase(deleteProjectThunk.rejected, (state, { payload }) => {
      state.status = 'rejected';
    });
  }
});

export const {
  addProjects,
  deleteProject,
  addCodeList,
  addProduct,
  editProduct,
  addCode,
  addNeed,
  editNeed,
  editCode,
  editCodelist,
  publishProject,
  editProject,
  editRequirement,
  addRequirement
} = projectSlice.actions;

export default projectSlice.reducer;
