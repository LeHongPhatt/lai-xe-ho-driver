import {
  Divider,
  HomeLayout,
  ScrollViewCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'theme';

import {
  OrderList,
  OrderStatus,
  OrderAccount,
  OrderDriverAccepted,
} from '../../Components/Order';

import Icon from 'assets/svg/Icon';
import Timeline from '../../Components/Order/TimeLine';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useOrder } from 'hooks';
import {
  ButtonNextStatus,
  IOrderItem,
  OrderStatus as ORDER_STATUS,
  ProcessingOrderStatus,
} from 'types';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import { useGetDetailMutation } from 'store/order/Api';

export default function OrderDetail() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'OrderDetail'>>();
  const { onUpdateStatusOrder, listOrder } = useOrder();
  const [getOrderDetail, { data }] = useGetDetailMutation();

  const [orderDetail, setOrderDetail] = useState<IOrderItem | undefined>(
    undefined,
  );

  const { navigate } = useNavigation();
  const activeStep = useMemo(() => {
    if (orderDetail) {
      if (
        [ORDER_STATUS.DRIVER_DELIVERING, ORDER_STATUS.RESTAURANT_DONE].includes(
          orderDetail.status as any,
        )
      ) {
        return 2;
      }
      if ([ORDER_STATUS.DELIVERED].includes(orderDetail.status as any)) {
        return 3;
      }
    }
    return 1;
  }, [orderDetail]);
  const isHideButton = useMemo(() => {
    return [
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.CANCEL,
      ORDER_STATUS.DRIVER_PICKING,
    ].includes(orderDetail?.status as any);
  }, [orderDetail]);

  const onPressUpdateStatusOrder = useCallback(() => {
    if (orderDetail) {
      onUpdateStatusOrder(
        {
          orderCode: orderDetail?.order_code,
          status: orderDetail?.status,
        },
        res => {
          console.log(
            '🚀 ~ file: OrderDetail.tsx:67 ~ onPressUpdateStatusOrder ~ res:',
            res,
          );
          reloadOrderData();
        },
      );
    }
  }, [orderDetail]);
  const reloadOrderData = useCallback(() => {
    if (params.orderCode) {
      getOrderDetail({ orderCode: params.orderCode });
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      if (data?.data?.result?.[0]) {
        setOrderDetail(data.data.result[0]);
      }
    }
  }, [data]);
  useEffect(() => {
    reloadOrderData();
  }, [params, listOrder]);

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'order.title_detail',
        iconColor: Colors.white,
      }}>
      <ScrollViewCus contentContainerStyle={styles.container}>
        <ViewCus mt-16>
          <Timeline activeStep={activeStep} />
        </ViewCus>
        {/*  */}
        <OrderStatus orderDetail={orderDetail} />
        <OrderList orderDetail={orderDetail as any} />
        <OrderAccount orderDetail={orderDetail} />
        <OrderDriverAccepted orderDetail={orderDetail} />
      </ScrollViewCus>
      <ViewCus px-18 pb-18 pt-14 flex-row justify-space-between style={{}}>
        <ViewCus justify-center items-center>
          <TouchCus
            onPress={() => {
              if (
                orderDetail &&
                ProcessingOrderStatus.includes(orderDetail.status)
              ) {
                NavigationService.navigate(Routes.Delivery, {
                  orderCode: orderDetail?.order_code,
                });
              }
            }}>
            <Icon.Map />
          </TouchCus>
          <TextCus useI18n>activity.watch_map</TextCus>
        </ViewCus>
        <Divider small color={Colors.greyEE} style={styles.divide} />

        <ViewCus justify-center items-center>
          <Icon.PhoneBlack />
          <TextCus useI18n>restaurant.title</TextCus>
        </ViewCus>
        <Divider small color={Colors.greyEE} style={styles.divide} />

        <ViewCus justify-center items-center>
          <Icon.PhoneBlack />
          <TextCus useI18n>restaurant.customer</TextCus>
        </ViewCus>
      </ViewCus>
      {orderDetail?.status &&
        ProcessingOrderStatus.includes(orderDetail.status) && (
          <ViewCus px-16 flex-row mb-10>
            <ViewCus w-48 h-48 mr-16 style={styles.boxCallHelp}>
              <Icon.CallHelp />
            </ViewCus>

            <ViewCus
              style={styles.buttonConfirm}
              px-12
              h-48
              items-center
              justify-center
              bg-main>
              {orderDetail?.status && (
                <TouchableOpacity
                  onPress={!isHideButton ? onPressUpdateStatusOrder : () => {}}>
                  <TextCus bold style={styles.textConfirm} useI18n>
                    {ButtonNextStatus?.[orderDetail?.status]}
                  </TextCus>
                </TouchableOpacity>
              )}
            </ViewCus>
          </ViewCus>
        )}
    </HomeLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.greyF7,
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  divide: {
    height: '100%',
    borderWidth: 1,
    borderColor: Colors.greyAD,
    marginVertical: 4,
  },
  boxInfo: {
    marginTop: 12,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  infoMoney: { width: '100%', paddingHorizontal: 22, marginTop: 4 },
  time: {
    fontSize: 12,
    lineHeight: 20,
  },
  textConfirm: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonConfirm: {
    borderRadius: 16,
    width: '82%',
  },
  boxCallHelp: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.black3A,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
