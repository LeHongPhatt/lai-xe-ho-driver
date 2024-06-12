import { IconName } from 'assets';
import {
  BottomSheetModalContainer,
  Divider,
  IconApp,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import React, { forwardRef } from 'react';
import PromotionItem from './PromotionItem';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { width } from 'utils';
interface PageProps {
  onCloseModal: () => void;
}
const PromotionDetail = ({ onCloseModal }: PageProps, ref) => {
  return (
    <BottomSheetModalContainer
      ref={ref}
      hideBackdrop={false}
      snapPoints={['88%']}>
      <ViewCus flex-row justify-space-between px-16 mb-12>
        <TextCus semiBold heading5 mb-12 f-1 textAlign="center">
          Chi tiết ưu đãi
        </TextCus>
        <TouchCus onPress={onCloseModal}>
          <IconApp name={IconName.Remove} size={20} />
        </TouchCus>
      </ViewCus>
      <PromotionItem />
      <BottomSheetScrollView contentContainerStyle={styles.container}>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mb-8>
          <TextCus color-grey85>Mã</TextCus>
          <TextCus bold>HLNOW1121</TextCus>
        </ViewCus>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus color-grey85>Hạn sử dụng</TextCus>
          <TextCus bold>01/10/2022</TextCus>
        </ViewCus>
        <Divider small style={styles.line} />
        <TextCus bold mb-8>
          Điều kiện áp dụng
        </TextCus>
        <ViewCus flex-row items-flex-start mb-4>
          <ViewCus style={styles.circle} mr-12 />
          <TextCus style={[BaseStyle.flexShrink1]}>
            Ưu đãi 30% tối đa 15k cho dịch vụ giao đồ ăn với hóa đơn từ 0đ
          </TextCus>
        </ViewCus>
        <ViewCus flex-row items-flex-start mb-4>
          <ViewCus style={styles.circle} mr-12 />
          <TextCus style={[BaseStyle.flexShrink1]}>
            Áp dụng khi sử dụng dịch vụ giao đồ ăn.
          </TextCus>
        </ViewCus>
        <ViewCus flex-row items-flex-start mb-4>
          <ViewCus style={styles.circle} mr-12 />
          <TextCus style={[BaseStyle.flexShrink1]}>
            Áp dụng một số quận tại thành phố Hồ Chí Minh như Quận 1, Quận 2,
            Quận 3, Quận 4, Quận 5, Quận 7, Quận 10, Quận Tân Bình, Quận Bình
            Thạnh, Quận Phú Nhuận, Quận Gò Vấp, Quận Bình Tân. Quận Tân Phú và
            thành phố Thủ Đức.
          </TextCus>
        </ViewCus>
        <ViewCus flex-row items-flex-start mb-4>
          <ViewCus style={styles.circle} mr-12 />
          <TextCus style={[BaseStyle.flexShrink1]}>
            Áp dụng cho mọi phương thức thanh toán.
          </TextCus>
        </ViewCus>
      </BottomSheetScrollView>
    </BottomSheetModalContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width,
    paddingHorizontal: 16,
  },
  line: {
    marginVertical: 16,
    backgroundColor: Colors.greyD1,
  },
  circle: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: Colors.black,
    marginTop: 8,
  },
});
export default forwardRef(PromotionDetail);
