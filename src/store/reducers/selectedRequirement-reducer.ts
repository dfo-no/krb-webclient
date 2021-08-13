import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedRequirementState {
  reqId: string | null;
}
const initialState: SelectedRequirementState = { reqId: null };

const selectedRequirementSlice = createSlice({
  name: 'selectedRequirement',
  initialState,
  reducers: {
    selectRequirement(state, { payload }: PayloadAction<string>) {
      state.reqId = payload;
    }
  }
});

export const { selectRequirement } = selectedRequirementSlice.actions;

export default selectedRequirementSlice.reducer;
