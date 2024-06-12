import React, { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import {
  HomeLayout,
  TextCus,
  ViewCus,
  Switch,
  IconApp,
  TouchCus,
} from 'components';
import { Colors } from 'theme';
import { isIos } from 'utils';
import { useAuth, useOrder, useDriverSocket, useLocation } from 'hooks';
import { IconName } from 'assets';
import { BottomSheetNewOrder } from './Components/Order';
import { TabHomeControl } from './Components';
import { TaxiNewOrderWarning } from './Components/TaxiOrder';
import { useDispatch } from 'react-redux';
import { changeRestStatus } from 'store/user';

const Home: React.FC = () => {
  const {
    statusWorking,
    onChangeStatusWorking,
    setStatusWorking,
    statusText,
    getListProcessingOrder,
  } = useOrder();
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState(null);
  const { locationUser } = useLocation();

  const {
    onNewOrder,
    onAcceptOrderSocket,
    onConnectError,
    onRestaurantDoneOrder,
    onNewMotobikeTaxi,
    onAcceptMotobikeTaxiSocket,
    isConnected,
    connect,
    disconnect,
    activitees,
  } = useDriverSocket();
  const { userInfo } = useAuth();

  //#region hanlde function
  const onNewOrderReceive = useCallback(
    data => {
      if (
        data &&
        data?.result &&
        Array.isArray(data?.result) &&
        data?.result[0]
      ) {
        setNewOrder(data?.result[0]);
      }
    },
    [setNewOrder],
  );
  const onRestaurantDoneOrderHandle = useCallback(() => {
    getListProcessingOrder();
  }, []);

  const onPressDrawerMenu = () => {
    DeviceEventEmitter.emit('sidemenu:toggle');
  };
  const onAcceptOrder = useCallback(({ orderCode }) => {
    if (orderCode) {
      onAcceptOrderSocket({ orderCode });
    }
    getListProcessingOrder();
    setNewOrder(null);
  }, []);

  const onRejectOrder = useCallback(() => {
    setNewOrder(null);
  }, []);
  //#endregion

  //#region Watch change
  useEffect(() => {
    getListProcessingOrder();
    onNewOrder(onNewOrderReceive);
    onRestaurantDoneOrder(onRestaurantDoneOrderHandle);
    onConnectError(() => {
      dispatch(changeRestStatus(false));
    });
  }, []);
  useEffect(() => {
    if (statusWorking) {
      if (!isConnected) {
        connect();
      }
    } else {
      if (isConnected) {
        disconnect();
      }
    }
  }, [statusWorking, isConnected]);
  useEffect(() => {
    if (isConnected) {
      activitees(locationUser);
    }
    if (locationUser.lat === 0 && locationUser.long === 0) {
      setStatusWorking(false);
    }
  }, [statusWorking, isConnected, locationUser]);
  //#endregion

  return (
    <HomeLayout
      bgColor={isIos ? Colors.main : Colors.white}
      header={{
        notGoBack: true,
      }}>
      {/* <IndicatorTop /> */}
      <ViewCus f-1 bg-greyF7>
        <ViewCus
          flex-row
          justify-space-between
          px-16
          py-12
          items-center
          bg-white>
          <TouchCus onPress={onPressDrawerMenu} mr-12>
            <IconApp name={IconName.Menu} size={26} />
          </TouchCus>
          <ViewCus f-1>
            <TextCus heading4 bold>
              {userInfo?.full_name || ''}
            </TextCus>
            <TextCus subhead color-grey85>
              {statusText}
            </TextCus>
          </ViewCus>
          <Switch
            value={statusWorking as boolean}
            onValueChange={onChangeStatusWorking}
            inActiveText={'Tạm nghỉ'}
            activeText={'Vào ca'}
            backgroundActive={Colors.blue47}
            backgroundInactive={Colors.grey85}
          />
        </ViewCus>
        <TabHomeControl />
      </ViewCus>
      {newOrder && (
        <BottomSheetNewOrder
          newOrder={newOrder}
          onAcceptOrder={onAcceptOrder}
          onRejectOrder={onRejectOrder}
        />
      )}
      <TaxiNewOrderWarning
        activitees={activitees}
        connect={connect}
        disconnect={disconnect}
        isConnected={isConnected}
        onAcceptMotobikeTaxiSocket={onAcceptMotobikeTaxiSocket}
        onNewMotobikeTaxi={onNewMotobikeTaxi}
      />
    </HomeLayout>
  );
};
export default Home;
