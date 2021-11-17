import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Code } from '../../models/Code';
import { Codelist } from '../../models/Codelist';
import ModelType from '../../models/ModelType';
import { Parentable } from '../../models/Parentable';

interface SelectedCodeListState {
  codelist: Codelist;
}

const initialState: SelectedCodeListState = {
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
    selectCodeList(state, { payload }: PayloadAction<Codelist>) {
      state.codelist = payload;
    },
    editCodelist(state, { payload }: PayloadAction<Codelist>) {
      state.codelist = payload;
    },
    editCodeInSelectedCodelist(
      state,
      { payload }: PayloadAction<Parentable<Code>>
    ) {
      const codeIndex = state.codelist.codes.findIndex(
        (elem) => elem.id === payload.id
      );
      if (codeIndex !== -1) {
        state.codelist.codes[codeIndex] = payload;
      }
    },
    removeCodeInSelectedCodelist(state, { payload }: PayloadAction<Code>) {
      const codeIndex = state.codelist.codes.findIndex(
        (elem) => elem.id === payload.id
      );
      if (codeIndex !== -1) {
        state.codelist.codes.splice(codeIndex, 1);
      }
    },
    addCodeToSelected(state, { payload }: PayloadAction<Parentable<Code>>) {
      state.codelist.codes.push(payload);
    },
    setCodesToSelected(state, { payload }: PayloadAction<Parentable<Code>[]>) {
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
