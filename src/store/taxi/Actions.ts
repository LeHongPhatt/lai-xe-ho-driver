/** @format */

import { IHomeActionPayload } from 'types';
export enum TaxiActionEnum {
  GET = 'GET',
  GET_LAST = 'GET_LAST',
  POST = 'POST',
  POST_LAST = 'POST_LAST',
}
export const TaxiActions = {
  GET: TaxiActionEnum.GET,
  GET_LAST: TaxiActionEnum.GET_LAST,
  POST: TaxiActionEnum.POST,
  POST_LAST: TaxiActionEnum.POST_LAST,
};

export type ActionBaseRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => { payload; type: TaxiActionEnum; callback };

export const getActionRequest: ActionBaseRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: TaxiActions.GET,
  callback,
});

export const getLastActionRequest: ActionBaseRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: TaxiActions.GET_LAST,
  callback,
});

export const postActionRequest: ActionBaseRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: TaxiActions.POST,
  callback,
});

export const postLastActionRequest: ActionBaseRequest = (
  payload: IHomeActionPayload['payload'],
  callback?: IHomeActionPayload['callback'],
) => ({
  payload,
  type: TaxiActions.POST_LAST,
  callback,
});
