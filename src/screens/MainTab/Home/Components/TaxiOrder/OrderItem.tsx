import React from 'react';
import {
  Divider,
  TextCus,
  ViewCus,
  IconApp,
  Buttons,
  TouchCus,
} from 'components';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { IconName } from 'assets';
import {
  ITaxiItem,
  LableTaxiOrderNextAction,
  LableTaxiOrderStatus,
  TaxiDeviceEvent,
} from 'types/taxi';
import OrderItemBody from './OrderItemBody';
import { useTaxi } from 'hooks';
import { useNavigation } from '@react-navigation/native';
import { Routes } from 'navigation';
interface IProps {
  item: ITaxiItem;
}
const OrderItem: React.FC<IProps> = props => {
  const { updateOrderStatus, isLoadingFetchUpdateOrderStatus } = useTaxi();
  const { navigate } = useNavigation();
  return (
    <ViewCus bg-white style={[BaseStyle.wrapperMain, styles.wrapperItem]}>
      <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
        <TextCus main color-blue47>
          {LableTaxiOrderStatus[props.item.status]}
        </TextCus>
        <TouchCus
          onPress={() => {
            navigate(Routes.TaxiOrderDetail, {
              id: props.item.id,
            });
          }}
          style={[BaseStyle.flexRow, BaseStyle.flexRowSpaceBetwwen]}>
          <TextCus main color-grey85 mr-8>
            Chi tiết
          </TextCus>
          <IconApp name={IconName.ChevronRight} />
        </TouchCus>
      </ViewCus>
      <Divider small color={Colors.greyEE} style={styles.divider} />

      <OrderItemBody item={props.item} />

      <Buttons
        disabled={isLoadingFetchUpdateOrderStatus}
        onPress={() => {
          updateOrderStatus(props.item, rs => {
            if (rs?.data?.status === 200) {
              DeviceEventEmitter.emit(TaxiDeviceEvent.RELOAD_LIST_ORDER);
            }
          });
        }}
        mt-10>
        <TextCus heading5 color-white px-12>
          {LableTaxiOrderNextAction[props.item.status]}
        </TextCus>
      </Buttons>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 35,
    position: 'absolute',
    top: 25,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greyAD,
    borderStyle: 'dashed',
  },
  active: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  nonActive: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  divider: {
    marginVertical: 12,
  },
  dividerS: {
    marginVertical: 8,
    backgroundColor: 'transparent',
    borderBottomColor: Colors.greyEE,
    borderBottomWidth: 1,
    borderStyle: Platform.select({
      ios: 'solid',
      android: 'dashed',
    }),
  },
  label: {
    fontSize: 18,
  },
  btn: {
    padding: 10,
  },
  wrapperItem: {
    borderRadius: 16,
  },
});
export default OrderItem;
