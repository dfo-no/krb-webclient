import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedProjectState {
  id: string | null;
}

const initialState: SelectedProjectState = { id: null };

const selectedProjectSlice = createSlice({
  name: 'selectedProject',
  initialState,
  reducers: {
    selectProject(state, { payload }: PayloadAction<string>) {
      state.id = payload;
    }
  }
});

export const { selectProject } = selectedProjectSlice.actions;

export default selectedProjectSlice.reducer;
