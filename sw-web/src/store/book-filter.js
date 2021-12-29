import { createSlice } from '@reduxjs/toolkit';

const initialState = { era: '', canonicity: '', reprint: '' };

const bookFilterSlice = createSlice({
  name: 'book-filter',
  initialState,
  reducers: {
    filterByCanonicity(state, action) {
      state.canonicity = action.payload.value;
      state.era = '';
    },
    filterByEra(state, action) {
      state.era = action.payload.value;
    },
    filterByReprint(state, action) {
      state.reprint = action.payload.value;
    }
  }
});

export const bookFilterActions = bookFilterSlice.actions;
export default bookFilterSlice.reducer;
