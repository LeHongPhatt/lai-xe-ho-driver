import { NodataOrder, RNFlatList, ViewCus } from 'components';
import { useListTaxi } from 'hooks';
import React, { useEffect } from 'react';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import OrderItem from './OrderItem';
import { ProcessingTaxiOrderStatus, TaxiDeviceEvent } from 'types/taxi';
import { useDispatch } from 'react-redux';
import { setOrderWorking } from 'store/taxi';

interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = () => {
  const { listDataTable, refreshData, isRefreshing, loadMore } = useListTaxi(
    10,
    ProcessingTaxiOrderStatus,
  );
  const dispatch = useDispatch();
  const renderItemSeparator = () => {
    return <ViewCus style={styles.itemSeparator} />;
  };

  useEffect(() => {
    const listenNewOrderAccept = DeviceEventEmitter.addListener(
      TaxiDeviceEvent.ON_ACCEPT_NEW_ORDER,
      () => {
        refreshData();
      },
    );
    const listenReload = DeviceEventEmitter.addListener(
      TaxiDeviceEvent.RELOAD_LIST_ORDER,
      () => {
        refreshData();
      },
    );
    return () => {
      listenNewOrderAccept.remove();
      listenReload.remove();
    };
  }, []);

  useEffect(() => {
    if (listDataTable && listDataTable.length > 0) {
      dispatch(setOrderWorking(listDataTable));
    }
  }, [listDataTable]);

  return (
    <RNFlatList
      data={listDataTable}
      style={styles.flatlist}
      renderItem={({ item }: { item: any; index: number }) => (
        <OrderItem item={item} />
      )}
      refreshing={isRefreshing}
      onRefresh={refreshData}
      keyExtractor={(item: any, index) => {
        return item.id + index;
      }}
      ItemSeparatorComponent={renderItemSeparator}
      ListEmptyComponent={<NodataOrder />}
      onEndReached={loadMore}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 16,
  },
  itemSeparator: {
    height: 12,
  },
  contentContainerStyle: {
    paddingVertical: 8,
  },
});
export default OrderList;
