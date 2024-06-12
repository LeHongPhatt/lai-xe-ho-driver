import {
  BottomSheetModalContainer,
  Divider,
  ScrollViewCus,
  SelecterPicker,
  TextCus,
  ViewCus,
  TouchCus,
} from 'components';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';

import Icon from 'assets/svg/Icon';
// import { StatusDelivery } from 'components/StatusDelivery';
// import { NavigationService, Routes } from 'navigation';
import { IRefBottom, OrderStatus } from 'types';
// import { getCurrentDate } from 'utils';
// import HistoryOrderList from './HistoryOrderList';
import ListOrder from './ListOrder';
import { useListOrder, useOrder } from 'hooks';

export default function OrderHistoryTab() {
  const { isLoading, isRefreshing, listDataTable, loadMore, refreshData } =
    useListOrder(10, [OrderStatus.DELIVERED, OrderStatus.CANCEL]);
  return (
    <ListOrder
      data={listDataTable as any}
      onRefresh={refreshData}
      isRefreshing={isRefreshing}
      onEndReached={loadMore}
      onPressUpdateStatusOrder={() => {}}
    />
  );
}
const styles = StyleSheet.create({
  boxChooseDate: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.greyF7,
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  divide: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: Colors.greyAD,
    marginVertical: 4,
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  boxTotalOrder: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 16,
  },
  boxInfo: {
    marginTop: 12,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  infoMoney: { width: '100%', paddingHorizontal: 22, marginTop: 4 },
  time: {
    fontSize: 12,
    lineHeight: 20,
  },
  textConfirm: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonConfirm: {
    display: 'flex',
    borderRadius: 16,
    width: '82%',
  },
  boxCallHelp: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.black3A,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
