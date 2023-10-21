import { createSlice } from '@reduxjs/toolkit';
import { IFilterState } from '@/types/filter.interface';

const initialState: IFilterState = {
  search: '',
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = filter.actions;
export default filter.reducer;
