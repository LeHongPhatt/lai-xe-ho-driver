import React from 'react';
import { ImageCus, TextCus, TouchCus, ViewCus } from 'components';
import { Colors } from 'theme';
import { Images } from 'assets';
import { ImageBackground, Platform, StyleSheet } from 'react-native';
import { width } from 'utils';

interface IProps {
  onPress?: () => void | undefined;
}

const PromotionItem: React.FC<IProps> = ({ onPress }) => {
  return (
    <ImageBackground source={Images.bgPromotion} style={styles.bgImageCover}>
      <TouchCus style={styles.wrapperItem} onPress={onPress!}>
        <ViewCus mr-12>
          <ImageCus
            source={Images.icDelivery}
            style={styles.image}
            resizeMode="contain"
          />
        </ViewCus>
        <ViewCus ml-15>
          <TextCus subhead bold>
            HLNOW1121
          </TextCus>
          <TextCus bold color={Colors.blue47}>
            Giảm 4k cho đơn hàng từ 60k
          </TextCus>
          <TextCus color-grey85 mb-5>
            Áp dụng cho dịch vụ Đồ ăn
          </TextCus>
          <TextCus caption color-grey85>
            HSD: 10/02/2024
          </TextCus>
        </ViewCus>
      </TouchCus>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
  },
  wrapperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bgImageCover: {
    width: width - 32,
    resizeMode: 'contain',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 20,
    marginBottom: 16,
    ...Platform.select({
      android: {
        paddingHorizontal: 18,
        height: 120,
      },
      ios: {
        paddingHorizontal: 16,
        height: 114,
      },
    }),
    borderRadius: 6,
  },
});
export default PromotionItem;
