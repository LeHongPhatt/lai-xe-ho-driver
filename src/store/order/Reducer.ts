/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { IOrderState } from 'types';

const initialState = {
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  listOrder: [],
  processing: {
    list: [],
    page: 1,
    limit: 10,
    loading: false,
    error: null,
  },
} as IOrderState;

const orderSlice = createSlice({
  name: 'order',
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
      const { page, limit, listOrder } = payload;
      const currentList = state.listOrder ?? [];
      return {
        ...state,
        error: null,
        loading: false,
        page,
        limit,
        listOrder: page > 1 ? [...currentList, ...listOrder] : listOrder,
      };
    },
    actionRequestListProcessing: state => {
      return {
        ...state,
        processing: {
          ...state.processing,
          loading: true,
          error: null,
        },
      };
    },
    getDataProcessingSuccess: (state, { payload }: { payload: any }) => {
      const { page, limit, listOrder } = payload;
      const currentList = state.processing.list ?? [];
      return {
        ...state,
        error: null,
        loading: false,
        processing: {
          list: page > 1 ? [...currentList, ...listOrder] : listOrder,
          page,
          limit,
          loading: false,
          error: null,
        },
      };
    },
    errorDataProcesssingList: (state, { payload }: { payload: any }) => {
      const { errorMessage } = payload;
      return {
        ...state,
        error: null,
        loading: false,
        processing: {
          loading: false,
          error: errorMessage,
        },
      };
    },
  },
});

export const {
  actionRequest,
  getDataSuccess,
  getDataProcessingSuccess,
  actionRequestListProcessing,
  errorDataProcesssingList,
} = orderSlice.actions;

export default orderSlice.reducer;
