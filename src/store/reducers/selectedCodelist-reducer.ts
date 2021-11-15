import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICode } from '../../models/ICode';
import { ICodelist } from '../../models/ICodelist';
import ModelType from '../../models/ModelType';

interface ISelectedCodeListState {
  codelist: ICodelist;
}

const initialState: ISelectedCodeListState = {
  codelist: {
    id: '',
    title: '',
    description: '',
    codes: [],
    type: ModelType.codelist,
    sourceOriginal: null,
    sourceRel: null
  }
};

const selectedCodeListState = createSlice({
  name: 'selectedCodeList',
  initialState,
  reducers: {
    selectCodeList(state, { payload }: PayloadAction<ICodelist>) {
      state.codelist = payload;
    },
    editCodelist(state, { payload }: PayloadAction<ICodelist>) {
      state.codelist = payload;
    },
    editCodeInSelectedCodelist(state, { payload }: PayloadAction<ICode>) {
      const codeIndex = state.codelist.codes.findIndex(
        (elem) => elem.id === payload.id
      );
      if (codeIndex !== -1) {
        state.codelist.codes[codeIndex] = payload;
      }
    },
    removeCodeInSelectedCodelist(state, { payload }: PayloadAction<ICode>) {
      const codeIndex = state.codelist.codes.findIndex(
        (elem) => elem.id === payload.id
      );
      if (codeIndex !== -1) {
        state.codelist.codes.splice(codeIndex, 1);
      }
    },
    addCodeToSelected(state, { payload }: PayloadAction<ICode>) {
      state.codelist.codes.push(payload);
    },
    setCodesToSelected(state, { payload }: PayloadAction<ICode[]>) {
      state.codelist.codes = payload;
    }
  }
});

export const {
  selectCodeList,
  editCodelist,
  editCodeInSelectedCodelist,
  removeCodeInSelectedCodelist,
  addCodeToSelected,
  setCodesToSelected
} = selectedCodeListState.actions;

export default selectedCodeListState.reducer;
