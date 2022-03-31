import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISelectedRequirementState {
  reqId: string | null;
}
const initialState: ISelectedRequirementState = { reqId: null };

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
