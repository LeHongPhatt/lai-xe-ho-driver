import {
  CarouselHorizontal,
  ImageCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { formatMoney, width } from 'utils';
interface Item {
  id: string;
  name: string;
}
const items: Item[] = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
];
interface IProps {}
const FoodPromotion: React.FC<IProps> = () => {
  const onPressItem = useCallback(() => {}, []);
  const renderItem = useCallback(({ item, index }) => {
    const {} = item;
    return (
      <TouchCus onPress={onPressItem} style={styles.boxShadowItem} key={index}>
        <ViewCus flex-row justify-space-between style={styles.wrapperContent}>
          <ViewCus>
            <TextCus heading5>Cơm gà mắm tỏi</TextCus>
            <ViewCus flex-row f-1 style={styles.contentPrice}>
              <TextCus heading5 main mr-5>
                {formatMoney(50000)}
              </TextCus>
              <TextCus style={styles.price}>{formatMoney(55000)}</TextCus>
            </ViewCus>
          </ViewCus>
          <ImageCus
            source={{ uri: 'https://imgur.com/2fThsGj.png' }}
            style={styles.imagePromotion}
            resizeMode="cover"
          />
        </ViewCus>
      </TouchCus>
    );
  }, []);
  return (
    <CarouselHorizontal
      data={items}
      title={'home.title_promotion'}
      onPress={() => NavigationService.navigate(Routes.Promotion)}
      renderItem={renderItem}
    />
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 90,
    width: 90,
    borderRadius: 4,
  },
  wrapperContent: {
    overflow: 'hidden',
  },
  boxShadowItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.12,
    elevation: 8,
    width: width * 0.8,
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  contentPrice: {
    alignItems: 'center',
  },
  price: {
    textDecorationLine: 'line-through',
    color: Colors.grey85,
  },
});
export default FoodPromotion;
