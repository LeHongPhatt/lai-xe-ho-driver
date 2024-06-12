/** @format */

import { IOrderPayload } from 'types';

export const OrderActions = {
  GET_LIST_ORDER: 'GET_LIST_ORDER',
  GET_LIST_PROCESSING_ORDER: 'GET_LIST_PROCESSING_ORDER',
  POST_CONFIRM_PICKED_ORDER: 'POST_CONFIRM_PICKED_ORDER',
  POST_CONFIRM_DELIVERED_ORDER: 'POST_CONFIRM_DELIVERED_ORDER',
};

export const getBaseActionsRequest = (
  payload: IOrderPayload['payload'],
  callback?: IOrderPayload['callback'],
) => ({
  payload,
  type: OrderActions.GET_LIST_ORDER,
  callback,
});

export const onPostConfirmPickedOrder = (
  payload: IOrderPayload['payload'],
  callback?: IOrderPayload['callback'],
) => ({
  payload,
  type: OrderActions.POST_CONFIRM_PICKED_ORDER,
  callback,
});

export const onPostConfirmDeliveredOrder = (
  payload: IOrderPayload['payload'],
  callback?: IOrderPayload['callback'],
) => ({
  payload,
  type: OrderActions.POST_CONFIRM_DELIVERED_ORDER,
  callback,
});

export const getListProcessingRequest = (
  payload: IOrderPayload['payload'],
  callback?: IOrderPayload['callback'],
) => ({
  payload,
  type: OrderActions.GET_LIST_PROCESSING_ORDER,
  callback,
});
