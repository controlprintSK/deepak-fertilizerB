import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  error: '',
  isAuth: false,
  accessToken: '',
  refreshToken: '',
};

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    userSuccess: (state, { payload }) => {
      state.user = payload?.user;
      state.isAuth = true;
      state.error = '';
    },
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload?.accessToken;
    },
    setRefreshToken: (state, { payload }) => {
      state.refreshToken = payload?.refreshToken;
    },
    userUpdate: (state, { payload }) => {
      state.user = payload?.user;
    },
    userAccessTokenSuccess: (state, { payload }) => {
      state.accessToken = payload;
    },
    userRefreshTokenSuccess: (state, { payload }) => {
      state.refreshToken = payload;
    },
    userFail: (state, { payload }) => {
      state.error = payload;
      state.isAuth = false;
    },
    userClear: (state) => {
      state.isAuth = false;
      state.error = '';
      state.user = {};
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const {
  userSuccess,
  userUpdate,
  userAccessTokenSuccess,
  userRefreshTokenSuccess,
  userFail,
  userClear,
  setAccessToken,
  setRefreshToken,
} = userSlice.actions;

export const accessToken = (state) => state.userInfo.accessToken;
export const refreshToken = (state) => state.userInfo.refreshToken;
export const dbcode = (state) => state.userInfo.user.CurrentCompany;

export default userSlice.reducer;
