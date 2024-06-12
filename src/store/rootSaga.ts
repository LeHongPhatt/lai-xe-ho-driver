import { all } from 'redux-saga/effects';
import userSagas from './user/Sagas';
import homeSagas from './home/Sagas';
import categoriesSagas from './categories/Sagas';
import orderSagas from './order/Sagas';
import taxiSagas from './taxi/Sagas';

export default function* rootSaga() {
  yield all([
    userSagas(),
    homeSagas(),
    categoriesSagas(),
    orderSagas(),
    taxiSagas(),
  ]);
}
