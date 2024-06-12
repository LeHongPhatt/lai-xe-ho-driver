import { Buttons, TextCus, RoutineToUser, TouchCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ViewCus } from '../ViewCus';
import { Colors } from 'theme';
import { Divider } from 'react-native-paper';

interface IProps {
  onPressViewDetail: () => void;
}

const StatusDelivery: React.FC<IProps> = ({ onPressViewDetail }) => {
  const _handleViewDetailHistory = () => {
    onPressViewDetail();
  };
  return (
    <ViewCus bg-white px-12 py-8 style={styles.container}>
      <ViewCus mb-8 flex-row justify-space-between>
        <TextCus color-grey85 style={styles.textTime}>
          Nhà hàng Lam
        </TextCus>
        <TextCus color-grey85 useI18n style={styles.textTime}>
          11 : 02
        </TextCus>
      </ViewCus>
      <Divider />
      <ViewCus mt-4 flex-row justify-space-between>
        <TextCus color-black3A bold>
          ALF-0123
        </TextCus>
        <TouchCus onPress={_handleViewDetailHistory}>
          <TextCus color-blue47 useI18n style={styles.textDetail}>
            order.view_detail
          </TextCus>
        </TouchCus>
      </ViewCus>
      <RoutineToUser
        from="Cơm Chiên Mì Xào - Phan Đình Phùng"
        to="Trần Thanh Tâm"
      />
      <ViewCus flex-row items-center justify-space-between>
        <TextCus color-black3A>
          {'Thu hộ: '}
          <TextCus ml-2 color-orangeFF bold>
            690.000đ
          </TextCus>
        </TextCus>
        <Buttons style={[styles.btn]} onPress={() => {}} disabled={false}>
          <TextCus useI18n heading5 style={styles.textBtn}>
            order.deliveried
          </TextCus>
        </Buttons>
      </ViewCus>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  textBtn: {
    color: Colors.white,
  },
  btn: {
    color: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.main,
  },
  container: {
    borderRadius: 16,
  },
  textDetail: {
    fontSize: 14,
    lineHeight: 24,
  },
  textTime: {
    fontSize: 12,
    lineHeight: 20,
  },
});
export default StatusDelivery;
