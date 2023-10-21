import { RootState } from '@/redux/store';

export const selectSearch = (state: RootState) => state.filter.search;
