/** @format */

import { axiosClient } from 'utils';
import { takeLatest, put, all } from 'redux-saga/effects';
import { IHomeActionPayload, INofifyState } from 'types';
import { OrderActions } from './Actions';
import {
  actionRequest,
  getDataSuccess,
  getDataProcessingSuccess,
  actionRequestListProcessing,
  errorDataProcesssingList,
} from './Reducer';
import { error } from 'store/notify';
import { API_ENDPOINT } from 'utils';

function* onGetBaseActionsRequest(action: IHomeActionPayload) {
  try {
    yield put(actionRequest());
    const { params, endPoint } = action.payload;
    const rs = yield axiosClient.get(`${endPoint}`, {
      params,
    });

    if (rs.status === 200) {
      const payload = {
        page: parseInt(rs?.data?.currentPage || 1),
        limit: parseInt(rs?.data?.limit || 10),
        listOrder: rs?.data?.orders || [],
      };
      yield put(getDataSuccess(payload));
      if (action?.callback) {
        action?.callback?.(rs);
      }
    }
  } catch (e: any) {
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    yield put(getDataSuccess({}));
    return action?.callback?.({ ...e });
  }
}

function* watchGetBaseActions() {
  yield takeLatest(OrderActions.GET_LIST_ORDER as any, onGetBaseActionsRequest);
}

function* onPostConfirmPickedOrder(action: any) {
  try {
    const rs = yield axiosClient.post(
      `${API_ENDPOINT.ORDER.CONFIRM_PICKED_ORDER}/${action?.payload?.body?.orderCode}/picked`,
    );
    console.log(
      '🚀 ~ file: Sagas.ts:57 ~ function*onPostConfirmPickedOrder ~ rs:',
      rs,
    );
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    console.log(
      '🚀 ~ file: Sagas.ts:65 ~ function*onPostConfirmPickedOrder ~ e:',
      e,
    );
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    if (action?.callback) {
      action?.callback?.({ success: false, ...e });
    }
  }
}

function* watchPostConfirmPickedOrder() {
  yield takeLatest(
    OrderActions.POST_CONFIRM_PICKED_ORDER as any,
    onPostConfirmPickedOrder,
  );
}

function* onPostConfirmDeliveredOrder(action: any) {
  try {
    const rs = yield axiosClient.post(
      `${API_ENDPOINT.ORDER.CONFRIM_DELIVERED_ORDER}/${action?.payload?.body?.orderCode}/done`,
      action?.payload?.body,
    );
    if (action?.callback) {
      action?.callback?.(rs);
    }
  } catch (e: any) {
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    if (action?.callback) {
      action?.callback?.({ success: false, ...e });
    }
  }
}

function* watchPostConfirmDeliveredOrder() {
  yield takeLatest(
    OrderActions.POST_CONFIRM_DELIVERED_ORDER as any,
    onPostConfirmDeliveredOrder,
  );
}

function* onGetListProcessingOrderRequest(action: IHomeActionPayload) {
  try {
    yield put(actionRequestListProcessing());
    const { params, endPoint } = action.payload;
    const rs = yield axiosClient.get(`${endPoint}`, {
      params,
    });

    if (rs.status === 200) {
      const payload = {
        page: parseInt(rs?.data?.currentPage || 1),
        limit: parseInt(rs?.data?.limit || 10),
        listOrder: rs?.data?.orders || [],
      };
      yield put(getDataProcessingSuccess(payload));
    } else {
      yield put(
        errorDataProcesssingList({
          errorMessage: 'some_thing_wrong',
        }),
      );
    }
  } catch (e: any) {
    yield put(
      error({
        message: 'some_thing_wrong',
        options: { useI18n: true },
      } as INofifyState),
    );
    yield put(
      errorDataProcesssingList({
        errorMessage: 'some_thing_wrong',
      }),
    );
    return action?.callback?.({ ...e });
  }
}

function* watchGetListProcessingOrder() {
  yield takeLatest(
    OrderActions.GET_LIST_PROCESSING_ORDER as any,
    onGetListProcessingOrderRequest,
  );
}

export default function* orderSagas() {
  yield all([
    watchGetBaseActions(),
    watchPostConfirmPickedOrder(),
    watchPostConfirmDeliveredOrder(),
    watchGetListProcessingOrder(),
  ]);
}
