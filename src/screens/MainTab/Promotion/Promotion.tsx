import { RNFlatList, HomeLayout } from 'components';
import React, { useCallback, useRef } from 'react';
import { BaseStyle, Colors } from 'theme';
import { PromotionDetail, PromotionItem } from './components';
import { IRefBottom } from 'types';

export default function Promotion() {
  const refModal = useRef<IRefBottom>(null);
  const onPressItem = useCallback(item => {
    console.log('🚀 ~ file: Promotion.tsx:10 ~ onPressItem ~ item:', item);
    refModal.current?.show();
  }, []);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <PromotionItem
          {...item}
          key={index}
          onPress={() => onPressItem(item)}
        />
      );
    },
    [onPressItem],
  );
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        notGoBack: true,
        title: 'bottom.promotion',
        iconColor: Colors.white,
      }}>
      <RNFlatList
        data={[1, 2]}
        renderItem={renderItem}
        contentContainerStyle={BaseStyle.pd16}
      />
      <PromotionDetail
        ref={refModal}
        onCloseModal={() => refModal.current?.close()}
      />
    </HomeLayout>
  );
}
