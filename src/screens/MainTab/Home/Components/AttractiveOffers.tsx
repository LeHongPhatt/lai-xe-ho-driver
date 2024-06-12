import { Images } from 'assets';
import { CarouselHorizontal, ImageCus, TouchCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
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
const AttractiveOffers: React.FC<IProps> = () => {
  const onPressItem = useCallback(() => {
    NavigationService.navigate(Routes.Categories);
  }, []);
  const renderItem = useCallback(() => {
    return (
      <TouchCus onPress={onPressItem}>
        <ImageCus
          source={Images.banner}
          style={styles.imagePromotion}
          resizeMode="cover"
        />
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
    height: 167,
    width: 319,
  },
});
export default AttractiveOffers;
