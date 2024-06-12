/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { ELanguage, IAppState } from 'types';

const initialState = {
  loading: false,
  error: null,
  language: ELanguage.VI,
  isAuth: false,
  user: null,
  status: false,
  userInfo: {},
  isShowIntro: false,
} as IAppState;

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionRequest: state => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
    changeRestStatus: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        status: payload,
      };
    },
    reset: () => {
      return {
        ...initialState,
        isShowIntro: true,
      };
    },
    isShowIntro: state => {
      return {
        ...state,
        isShowIntro: true,
      };
    },
  },
});

export const {
  actionRequest,
  getDataSuccess,
  reset,
  changeRestStatus,
  isShowIntro,
} = userSlice.actions;

export default userSlice.reducer;
