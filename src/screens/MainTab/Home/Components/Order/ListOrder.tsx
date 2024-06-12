import React from 'react';
import { StyleSheet } from 'react-native';
import { RNFlatList, ViewCus, NodataOrder } from 'components';
import { NavigationService, Routes } from 'navigation';

import OrderItem from './OrderItem';

interface IProps {
  data: [];
  isRefreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  onPressUpdateStatusOrder: (data: any) => void;
}

const ListOrder: React.FC<IProps> = ({
  data,
  isRefreshing,
  onRefresh,
  onEndReached,
  onPressUpdateStatusOrder,
}) => {
  const keyExtractor = it => {
    return it.order_code;
  };

  const renderItemSeparator = () => {
    return <ViewCus style={styles.itemSeparator} />;
  };

  const onPressItem = orderCode => {
    NavigationService.navigate(Routes.OrderDetail, {
      orderCode,
    });
  };

  return (
    <RNFlatList
      data={data}
      style={styles.flatlist}
      renderItem={({ item }: { item: any; index: number }) => (
        <OrderItem
          item={item}
          from={`${item.restaurant?.[0].name} - ${item.restaurant?.[0]?.address}`}
          to={item.customer?.full_name || ''}
          price={item.order_price}
          id={item.id}
          orderCode={item.order_code}
          time={item.time}
          status={item.status}
          onPressNextAction={onPressUpdateStatusOrder}
          onPressItem={() => {
            onPressItem(item.order_code);
          }}
        />
      )}
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      ListEmptyComponent={<NodataOrder />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default ListOrder;

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
