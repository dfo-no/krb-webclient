import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from '../../models/Alert';

interface AlertState {
  list: Alert[];
}

const initialState: AlertState = { list: [] };

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert(state, { payload }: PayloadAction<{ alert: Alert }>) {
      state.list.unshift(payload.alert);
    },
    removeAlert(state, { payload }: PayloadAction<{ id: string }>) {
      const index = state.list.findIndex((alert) => alert.id === payload.id);
      if (index !== -1) {
        state.list.splice(index, 1);
      }
    }
  }
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
