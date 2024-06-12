/** @format */

import { axiosClient } from 'utils';
import { takeLatest, put, all, takeEvery } from 'redux-saga/effects';
import { IHomeActionPayload, INofifyState } from 'types';
import { TaxiActions } from './Actions';
import {} from './Reducer';
import { error } from 'store/notify';

//#region GET
function* getActionRequest(action: IHomeActionPayload) {
  try {
    const { params, endPoint } = action.payload;
    const rs = yield axiosClient.get(`${endPoint}`, {
      params,
    });

    if (rs.status === 200) {
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
    return action?.callback?.({ ...e });
  }
}

function* watchGetActions() {
  yield takeEvery(TaxiActions.GET as any, getActionRequest);
}

function* getLastActionRequest(action: IHomeActionPayload) {
  try {
    const { params, endPoint } = action.payload;
    const rs = yield axiosClient.get(`${endPoint}`, {
      params,
    });

    if (rs.status === 200) {
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
    return action?.callback?.({ ...e });
  }
}

function* watchGetLastActions() {
  yield takeLatest(TaxiActions.GET_LAST as any, getLastActionRequest);
}
//#endregion

//#region POST
function* postActionRequest(action: IHomeActionPayload) {
  try {
    const { params, endPoint, formData } = action.payload;
    const rs = yield axiosClient.post(`${endPoint}`, {
      params,
      formData,
    });

    if (rs.status === 200) {
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
    return action?.callback?.({ ...e });
  }
}

function* watchPostActions() {
  yield takeEvery(TaxiActions.POST as any, postActionRequest);
}

function* postLastActionRequest(action: IHomeActionPayload) {
  try {
    const { params, endPoint, formData } = action.payload;
    const rs = yield axiosClient.post(`${endPoint}`, {
      params,
      formData,
    });

    if (rs.status === 200) {
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
    return action?.callback?.({ ...e });
  }
}

function* watchPostLastActions() {
  yield takeLatest(TaxiActions.POST_LAST as any, postLastActionRequest);
}
//#endregion

export default function* taxiSagas() {
  yield all([
    watchGetActions(),
    watchGetLastActions(),
    watchPostActions(),
    watchPostLastActions(),
  ]);
}
