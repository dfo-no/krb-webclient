import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { del, get, post, put } from '../../api/http';
import { Utils } from '../../common/Utils';
import { Bank } from '../../models/Bank';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import { Need } from '../../models/Need';
import { Product } from '../../models/Product';
import { Publication } from '../../models/Publication';

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

export const putProjectThunk = createAsyncThunk(
  'putProjectThunk',
  async (project: Bank) => {
    const response = await put(
      `http://localhost:3001/projects/${project.id}`,
      JSON.stringify(project)
    );
    return response.data;
  }
);

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
      const index = state.list.findIndex(
        (project) => project.id === payload.id
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
      /* This 'findIndex' is wrapped in Utils.ensure() because we findIndex can
      return "undefined", but we are *sure* this index exist there.
      Otherwise the program would not work. If we didn't use Utils.ensure(),
      we would have to have a if-else statement to check for undefined.*/
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      state.list[index].needs.push(payload.need);
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
      { payload }: PayloadAction<{ id: number; product: Product }>
    ) {
      const index = Utils.ensure(
        state.list.findIndex((project) => project.id === payload.id)
      );
      const productindex = state.list[index].products.findIndex(
        (product) => product.id === payload.id
      );
      state.list[index].products[productindex] = payload.product;
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
    });
    builder.addCase(postProjectThunk.pending, (state, { payload }) => {});
    builder.addCase(postProjectThunk.rejected, (state, { payload }) => {});
    builder.addCase(putProjectThunk.fulfilled, (state, { payload }) => {});
    builder.addCase(putProjectThunk.pending, (state, { payload }) => {});
    builder.addCase(putProjectThunk.rejected, (state, { payload }) => {});
    builder.addCase(deleteProjectThunk.fulfilled, (state, { payload }) => {
      state.status = 'idle';
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
  editCode,
  editCodelist,
  publishProject,
  editProject
} = projectSlice.actions;

export default projectSlice.reducer;
