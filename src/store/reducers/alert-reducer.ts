import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from '../../models/Alert';

interface AlertState {
  list: Alert[];
}

const initialState: AlertState = { list: [] };

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert(
      state,
      { payload }: PayloadAction<{ text: string; style: string }>
    ) {
      state.list = [
        ...state.list,
        { text: payload.text, style: payload.style, id: uuidv4() }
      ];
    },
    removeAlert(state, { payload }: PayloadAction<{ id: string }>) {
      state.list = state.list.filter((alert) => {
        if (alert.id === payload.id) {
          return false;
        }
        return true;
      });
    }
  }
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
