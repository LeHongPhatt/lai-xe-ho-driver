import {
  HomeLayout,
  IconApp,
  Routine,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import React from 'react';
import { BaseStyle, Colors } from 'theme';
import { ContentRating } from '../components';
import { NavigationService, Routes } from 'navigation';
import { StyleSheet } from 'react-native';
import { formatMoney } from 'utils';
import { IconName } from 'assets';
const Rating: React.FC = () => {
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'activity.rating',
        iconColor: Colors.white,
      }}
      isForForm>
      <ViewCus px-16 pb-16>
        <ContentRating
          subtitle="Bạn đánh các món tại Cơm Gà Xối Mỡ 142 - Đinh Tiên Hoàng như thế nào"
          title="Đánh giá nhà hàng"
          onPress={() => NavigationService.navigate(Routes.RatingRestaurant)}
        />
        <ContentRating
          subtitle="Bạn đánh giá tài xế của bạn như thế nào?"
          title="Đánh giá tài xế"
          onPress={() => NavigationService.navigate(Routes.RatingBiker)}
        />
        <ViewCus style={styles.contentBox}>
          <ViewCus style={BaseStyle.flexRowSpaceBetwwen}>
            <TextCus bold>Thanh toán tiền mặt</TextCus>
            <TextCus bold>{formatMoney(250000)}</TextCus>
          </ViewCus>
          <Routine
            from="36 Đinh Tiên Hoàng, Phường 6, Quận Bình Thạnh"
            to="58 Trần Văn Danh, Phường 13, Quận Tân Bình"
            style={styles.clearPadding}
          />
          <TouchCus
            style={BaseStyle.flexRowSpaceBetwwen}
            onPress={() => NavigationService.navigate(Routes.HistoryActivity)}>
            <ViewCus flex-row items-center>
              <IconApp name={IconName.Term} color={Colors.grey85} size={18} />
              <TextCus ml-8>Xem chi tiết đơn hàng</TextCus>
            </ViewCus>
            <IconApp
              name={IconName.ChevronRight}
              color={Colors.grey85}
              size={16}
            />
          </TouchCus>
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  contentBox: {
    ...BaseStyle.boxShadow,
    marginTop: 24,
    padding: 14,
  },
  clearPadding: {
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
});
export default Rating;
