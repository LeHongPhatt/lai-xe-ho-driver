import { IconName } from 'assets';
import {
  TouchCus,
  ImageCus,
  CarouselHorizontal,
  IconApp,
  TextCus,
  ViewCus,
} from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { DATA_SUGGEST, width } from 'utils';
interface IProps {}
const SuggestionForYou: React.FC<IProps> = () => {
  const onPressItem = useCallback(() => {
    NavigationService.navigate(Routes.Categories);
  }, []);
  const renderItem = useCallback(({ item, index }) => {
    const {} = item;
    return (
      <TouchCus onPress={onPressItem} key={index} style={styles.itemImage}>
        <ImageCus
          source={item.image}
          style={styles.imagePromotion}
          resizeMode="cover"
        />
        <ViewCus style={styles.tag}>
          <IconApp name={IconName.Tag} size={60} color={Colors.main} />
          <TextCus subhead color-white bold style={styles.conent}>
            PROMO
          </TextCus>
        </ViewCus>
        <ViewCus p-8>
          <TextCus medium style={styles.lineH} mb-4>
            {item.name}
          </TextCus>
          <ViewCus flex-row items-center>
            <IconApp name={IconName.Start} size={16} color={Colors.yellowF8} />
            <TextCus color-grey82 pl-5>
              4.9 (938)
            </TextCus>
            <TextCus px-5 color-grey82>
              |
            </TextCus>
            <TextCus color-grey82>1.2 km</TextCus>
          </ViewCus>
        </ViewCus>
      </TouchCus>
    );
  }, []);
  return (
    <CarouselHorizontal
      data={DATA_SUGGEST}
      title={'home.title_porposed'}
      onPress={() => NavigationService.navigate(Routes.Promotion)}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={false}
    />
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 166,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  itemImage: {
    ...BaseStyle.boxShadow,
    position: 'relative',
    width: width / 2 - 22,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 16,
    marginRight: 16,
  },
  tag: {
    position: 'absolute',
    left: -2,
    top: -6,
  },
  conent: {
    position: 'absolute',
    left: 8,
    top: 15,
  },
  lineH: {
    lineHeight: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    overflow: 'visible',
    marginVertical: 12,
    backgroundColor: Colors.white,
  },
});
export default SuggestionForYou;
