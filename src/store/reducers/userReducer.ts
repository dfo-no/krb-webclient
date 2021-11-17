import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  name: string;
}

const initialState: IUserState = { name: '' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  }
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
