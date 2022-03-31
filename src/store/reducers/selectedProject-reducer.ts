import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * @deprecated
 */
interface ISelectedProjectState {
  id: string | null;
}

const initialState: ISelectedProjectState = { id: null };

/**
 * @deprecated
 */
const selectedProjectSlice = createSlice({
  name: 'selectedProject',
  initialState,
  reducers: {
    /**
      @deprecated use selectProject from from project slice instead
     * */
    selectProject(state, { payload }: PayloadAction<string>) {
      state.id = payload;
    }
  }
});

export const { selectProject } = selectedProjectSlice.actions;

export default selectedProjectSlice.reducer;
