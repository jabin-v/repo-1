import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/assesmentApi';
import loginReducer from './features/loginSlice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
