import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedProjectState {
  id: number | null;
}

const initialState: SelectedProjectState = { id: null };

const selectedProjectSlice = createSlice({
  name: 'selectedProject',
  initialState,
  reducers: {
    selectProject(state, { payload }: PayloadAction<number>) {
      state.id = payload;
    }
  }
});

export const { selectProject } = selectedProjectSlice.actions;

export default selectedProjectSlice.reducer;
