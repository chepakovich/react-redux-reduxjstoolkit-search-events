import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search results',
  initialState: {
    value: {
      events: [],
      performers: [],
      venues: [],
    },
  },
  reducers: {
    storeSearchResults: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { storeSearchResults } = searchSlice.actions;
export const selectSearchResults = state => state.searchResults.value;

export default searchSlice.reducer;
