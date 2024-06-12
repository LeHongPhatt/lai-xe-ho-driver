import Icon from 'assets/svg/Icon';
import { Buttons, Divider, HomeLayout, TextCus, ViewCus } from 'components';

import { useTaxi } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DeviceEventEmitter, Platform, StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import {
  ITaxiItem,
  LableTaxiOrderNextAction,
  ProcessingTaxiOrderStatus,
  TaxiDeviceEvent,
  TaxiOrderStatus,
  TaxiVehicle,
} from 'types';
import { TaxiMapViewOrder } from '../../Components/TaxiOrder';
import { useGetTaxiOrderDetailMutation } from 'store/taxi/Api';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Routes } from 'navigation';

const TaxiOrderDetail = () => {
  const { isLoadingFetchUpdateOrderStatus, updateOrderStatus } = useTaxi();
  const [fetchDetail, { data: fetchData }] = useGetTaxiOrderDetailMutation();
  const [orderDetail, setOrderDetail] = useState<ITaxiItem | null>(null);
  const { params } =
    useRoute<RouteProp<RootStackParamList, 'TaxiOrderDetail'>>();
  const { id: orderId } = params;
  const { navigate, canGoBack, goBack } = useNavigation();

  const reloadDetailOrder = useCallback(() => {
    if (orderId) {
      fetchDetail(orderId);
    }
  }, [orderId]);

  const onPressButton = useCallback(() => {
    if (orderDetail) {
      updateOrderStatus(orderDetail, () => {
        reloadDetailOrder();
        DeviceEventEmitter.emit(TaxiDeviceEvent.RELOAD_LIST_ORDER);
      });
    }
  }, [orderDetail]);

  const typeVehicle = useMemo(() => {
    switch (orderDetail?.vehicle) {
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
  }, [orderDetail]);

  useEffect(() => {
    reloadDetailOrder();
  }, [orderId]);

  useEffect(() => {
    if (
      fetchData &&
      fetchData.status === 200 &&
      Array.isArray(fetchData.data?.result) &&
      fetchData.data?.result.length > 0 &&
      fetchData.data?.result?.[0]
    ) {
      setOrderDetail(fetchData.data.result[0]);
    }
  }, [fetchData]);

  useEffect(() => {
    if (orderDetail && orderDetail.status === TaxiOrderStatus.COMPLETED) {
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
    <HomeLayout
      bgColor={Colors.white}
      header={{
        title: 'Chi tiết cuốc xe',
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
              <TextCus>{orderDetail.pickup_location.address}</TextCus>
            </ViewCus>
          </ViewCus>
          <Divider small color={Colors.greyEE} style={styles.divider} />

          <ViewCus mt-5 style={[BaseStyle.flexRowCenter]}>
            <ViewCus style={[styles.active]}>
              <Icon.EndLocation />
            </ViewCus>
            <ViewCus>
              <TextCus>{orderDetail.dropoff_location.address}</TextCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>

        <ViewCus f-1>
          <TaxiMapViewOrder orderDetail={orderDetail} />
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
              ProcessingTaxiOrderStatus.includes(orderDetail.status) && (
                <Buttons
                  onPress={onPressButton}
                  disabled={isLoadingFetchUpdateOrderStatus}>
                  <TextCus useI18n bold heading5 color={Colors.white}>
                    {LableTaxiOrderNextAction[orderDetail.status]}
                  </TextCus>
                </Buttons>
              )}
          </ViewCus>
        </ViewCus>
      </ViewCus>
    </HomeLayout>
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

export default TaxiOrderDetail;
