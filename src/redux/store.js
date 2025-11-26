import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    userState: userReducer,
    themeState: themeReducer,
  },
  devTools: true,
});

export default store;