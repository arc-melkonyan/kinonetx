import { RootState } from '@/redux/store';

export const selectAccessToken = (state: RootState) => state.user.access_token;
export const selectUserData = (state: RootState) => state.user.user;
