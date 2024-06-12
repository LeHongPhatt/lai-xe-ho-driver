/**
 * @format
 * @description get data from redux store when perform the user authentication
 */

import { createSelector } from 'reselect';
import { IOrderState } from 'types';

const selector = (state: { order: IOrderState }) => state.order;

export const getError = createSelector(
  selector,
  ({ error }: IOrderState) => error,
);

export const getLoading = createSelector(
  selector,
  ({ loading }: IOrderState) => loading,
);

// export const getAuthUser = createSelector(selector, app => app?.user);

export const getAttrByKey = (k: keyof IOrderState) =>
  createSelector(selector, app => app[k]);

export const getProcessingData = createSelector(
  selector,
  ({ processing }: IOrderState) => ({
    page: processing.page || 1,
    limit: processing.limit || 10,
    list: processing.list || [],
    loading: processing.loading,
    error: processing.error,
  }),
);
