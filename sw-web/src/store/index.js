import { configureStore } from '@reduxjs/toolkit';
import bookFilterReducer from './book-filter';

const store = configureStore({
  reducer: { bookFilter: bookFilterReducer }
});

export default store;
