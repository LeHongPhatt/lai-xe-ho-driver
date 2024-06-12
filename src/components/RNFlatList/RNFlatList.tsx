import React, { Ref, forwardRef, useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItem } from 'react-native';

interface IProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  renderItem: ListRenderItem<T> | null | undefined;
}
const RNFlatList = <T extends object | number>(
  { renderItem, ...rest }: IProps<T>,
  ref: Ref<FlatList<any>> | undefined,
) => {
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  return (
    <FlatList
      ref={ref}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
};
export default forwardRef(RNFlatList);
