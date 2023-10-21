import { IUserState } from '@/types/user.interface';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUserState = {
  access_token: '',
  user: {
    image: '',
    name: '',
  },
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = user.actions;
export default user.reducer;
