import Icon from 'assets/svg/Icon';
import { Buttons, Divider, HomeLayout, TextCus, ViewCus } from 'components';

import { useAuth, useOrder, useTaxi } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DeviceEventEmitter, Platform, StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import {
  ButtonNextStatus,
  IOrderItem,
  IRestaurantDetail,
  OrderStatus,
  ProcessingOrderStatus,
  TaxiDeviceEvent,
  TaxiVehicle,
} from 'types';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from 'navigation';
import { FoodMapViewOrder } from '../../Components/Order';
import { useGetDetailMutation } from 'store/order/Api';

const Delivery = () => {
  const { isLoadingFetchUpdateOrderStatus, updateOrderStatus } = useTaxi();
  const { onUpdateStatusOrder } = useOrder();
  const [getOrderDetail, { data }] = useGetDetailMutation();
  const [orderDetail, setOrderDetail] = useState<
    | (Omit<IOrderItem, 'restaurant'> & {
        restaurant: IRestaurantDetail;
      })
    | null
  >(null);
  const { params } = useRoute<RouteProp<RootStackParamList, 'Delivery'>>();
  const { orderCode: orderId } = params;
  const { navigate, canGoBack, goBack } = useNavigation();
  const { user } = useAuth();
  const { listOrder } = useOrder();

  const reloadDetailOrder = useCallback(() => {
    if (orderId) {
      getOrderDetail({ orderCode: orderId });
    }
  }, [orderId]);

  useEffect(() => {
    if (data) {
      setOrderDetail(data.data.result[0]);
    }
  }, [data]);

  useEffect(() => {
    reloadDetailOrder();
  }, [listOrder]);

  const onPressButton = useCallback(() => {
    if (orderDetail) {
      onUpdateStatusOrder(
        {
          orderCode: orderDetail.order_code,
          status: orderDetail.status,
        },
        rs => {
          console.log('🚀 ~ file: Delivery.tsx:59 ~ onPressButton ~ rs:', rs);
          reloadDetailOrder();
          DeviceEventEmitter.emit(TaxiDeviceEvent.RELOAD_LIST_ORDER);
        },
      );
    }
  }, [orderDetail]);

  const typeVehicle = useMemo(() => {
    switch (user?.vehicle) {
      case TaxiVehicle.MOTORBIKE:
        return (
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <Icon.PersonSimpleBike />
            <TextCus ml-8>Xe máy</TextCus>
          </ViewCus>
        );

      default:
        return (
          <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
            <Icon.CarSide />
            <TextCus ml-8>Xe ô tô</TextCus>
          </ViewCus>
        );
    }
  }, [user]);

  useEffect(() => {
    reloadDetailOrder();
  }, [orderId]);

  useEffect(() => {
    if (orderDetail && orderDetail.status === OrderStatus.DELIVERED) {
      if (canGoBack()) {
        goBack();
      } else {
        navigate(Routes.HomeTabs);
      }
    }
  }, [orderDetail]);

  if (!orderDetail) {
    return <></>;
  }

  return (
    <>
      <HomeLayout
        bgColor={Colors.white}
        header={{
          title: 'Bản đồ',
        }}>
        <ViewCus
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <ViewCus pl-16 pr-16 mb-8>
            <ViewCus mt-5 style={[BaseStyle.flexRowCenter]}>
              <ViewCus style={[styles.active]}>
                <Icon.StartLocation />
              </ViewCus>
              <ViewCus>
                <TextCus>{orderDetail.restaurant.address}</TextCus>
              </ViewCus>
            </ViewCus>
            <Divider small color={Colors.greyEE} style={styles.divider} />

            <ViewCus mt-5 style={[BaseStyle.flexRowCenter]}>
              <ViewCus style={[styles.active]}>
                <Icon.EndLocation />
              </ViewCus>
              <ViewCus>
                <TextCus>{orderDetail.customer.address}</TextCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>

          <ViewCus f-1>
            <FoodMapViewOrder orderDetail={orderDetail} />
          </ViewCus>

          <ViewCus>
            <ViewCus pl-16 pr-16 mt-8 style={[BaseStyle.flexRowSpaceBetwwen]}>
              <TextCus main color-grey85 useI18n>
                Loại phương tiện
              </TextCus>
              {typeVehicle}
            </ViewCus>
            <Divider small color={Colors.greyEE} style={styles.divider} />
            <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
              <ViewCus
                f-1
                flex-column
                items-center
                style={[
                  {
                    height: 50,
                    borderRightWidth: 1,
                  },
                ]}>
                <Icon.Phone
                  height={22}
                  width={22}
                  color={Colors.main}
                  fill={Colors.main}
                />
                <TextCus>Gọi điện</TextCus>
              </ViewCus>
              <ViewCus f-1 flex-column items-center>
                <Icon.Chatting height={22} width={22} color={Colors.main} />
                <TextCus>Nhắn tin</TextCus>
              </ViewCus>
            </ViewCus>
            <Divider small color={Colors.greyEE} style={styles.divider} />
            <ViewCus px-16 style={[styles.spacingBottom]}>
              {orderDetail &&
                ProcessingOrderStatus.includes(orderDetail.status) && (
                  <Buttons
                    onPress={onPressButton}
                    disabled={isLoadingFetchUpdateOrderStatus}>
                    <TextCus useI18n bold heading5 color={Colors.white}>
                      {ButtonNextStatus[orderDetail.status]}
                    </TextCus>
                  </Buttons>
                )}
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </HomeLayout>
    </>
  );
};
const styles = StyleSheet.create({
  line: {
    height: 35,
    position: 'absolute',
    top: 25,
    borderLeftWidth: 1,
    borderLeftColor: Colors.greyAD,
    borderStyle: Platform.select({
      ios: 'solid',
      android: 'dashed',
    }),
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
  spacingBottom: {
    ...Platform.select({
      android: {
        paddingBottom: 30,
      },
      ios: {
        paddingBottom: 30,
      },
    }),
    paddingTop: 10,
  },
});

export default Delivery;
