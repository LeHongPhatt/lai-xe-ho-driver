/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { ITaxiItem, ITaxiState } from 'types';

const initialState: ITaxiState = {
  orderWorking: null,
};

const taxiSlice = createSlice({
  name: 'taxi',
  initialState,
  reducers: {
    setOrderWorking: (
      state,
      payload: {
        payload: ITaxiItem[];
      },
    ) => {
      state.orderWorking = payload.payload;
    },
  },
});

export const { setOrderWorking } = taxiSlice.actions;

export default taxiSlice;
