import { createSelector } from 'reselect';
import { ITaxiState } from 'types/taxi';

const selector = (state: { taxi: ITaxiState }) => state.taxi;
export const selectOrderWorking = createSelector(
  selector,
  st => st.orderWorking,
);

export const getAttrByKey = (k: keyof ITaxiState) =>
  createSelector(selector, app => app[k]);
