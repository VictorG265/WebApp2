import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// имитация задержки
const fakeApiCall = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

// асинхронные экшены
export const addUserAsync = createAsyncThunk(
  'users/addUserAsync',
  async (user) => {
    return await fakeApiCall(user);
  }
);

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUserAsync',
  async (id) => {
    return await fakeApiCall(id);
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUserAsync',
  async (user) => {
    return await fakeApiCall(user);
  }
);

const userSlice = createSlice({
  name: 'userState',
  initialState: {
    users: [],
    currentUser: null,
    status: 'idle', // idle | loading | succeeded | failed
  },
  reducers: {
    logoutUser: (state) => {
      state.currentUser = null;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // addUser
      .addCase(addUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users.push(action.payload);
      })
      // deleteUser
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      // updateUser
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = action.payload;
      });
  },
});

export const { logoutUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;