import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  text: string;
  id: string;
}

const initialState: AlertState = { text: 'hei', id: '2' };

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert(state, action: PayloadAction<AlertState>) {
      state.text = action.payload.text;
    },
    removeAlert(state, action: PayloadAction<AlertState>) {
      state.text = action.payload.text;
    }
  }
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
