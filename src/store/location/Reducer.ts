import { createSlice } from '@reduxjs/toolkit';
import { ILocationState } from 'types';

const initialState: ILocationState = {
  location: {
    long: 0,
    lat: 0,
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, { payload }: { payload: ILocationState }) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});
export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
