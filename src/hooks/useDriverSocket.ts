import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { EventSocketType, IOrderItem } from 'types';
import { useLocation } from './useLocation';
import { IP_HOST } from '@env';
import { useSocket } from './useSocket';
import { useSelector } from 'react-redux';
import { selectOrderWorking } from 'store/taxi/Selector';
import { OrderSelectors } from 'store/order';

export const useDriverSocket = () => {
  const { socket, onConnectError } = useSocket({
    uri: `ws://${IP_HOST}/driver`,
    opts: {
      autoConnect: true,
      reconnection: true,
    },
  });

  const [isConnected, setIsConnected] = useState(false);

  const { locationUser } = useLocation();

  /** Taxi Order Processing */
  const orderWorking = useSelector(selectOrderWorking);
  /** Food Order Processing */
  const processingData = useSelector(OrderSelectors.getProcessingData);

  const activitees = useCallback(
    ({ lat, long }) => {
      const dataEmit: {
        lat: any;
        long: any;
        orderCode: null | string;
        motorcycleTaxiId: null | string;
      } = {
        lat,
        long,
        orderCode: null,
        motorcycleTaxiId: null,
      };

      if (orderWorking && orderWorking.length > 0) {
        for (let i = 0; i < orderWorking.length; i++) {
          const order = orderWorking[i];
          dataEmit.motorcycleTaxiId = order.id;
          break;
        }
      }
      if (processingData && processingData.list.length > 0) {
        for (let i = 0; i < processingData.list.length; i++) {
          const order = processingData.list[i];
          dataEmit.orderCode = order.order_code;
          break;
        }
      }

      socket.emit(EventSocketType.ACTIVITIES, dataEmit);
    },
    [socket, orderWorking, processingData],
  );

  //#region Order Socket Event
  const onNewOrder = useCallback(
    (callback: (data: any) => void) => {
      socket.removeListener(EventSocketType.NEW_ORDER);
      socket.on(EventSocketType.NEW_ORDER, callback);
    },
    [socket],
  );

  const onRestaurantDoneOrder = useCallback(
    (callback: (data: { order: IOrderItem }) => void) => {
      socket.removeListener(EventSocketType.RESTAURANT_DONE_ORDER);
      socket.on(EventSocketType.RESTAURANT_DONE_ORDER, callback);
    },
    [socket],
  );

  const onAcceptOrderSocket = useCallback(
    ({ orderCode }) => {
      socket.emit(EventSocketType.ACCEPT_ORDER, {
        orderCode,
      });
    },
    [socket],
  );
  //#endregion

  //#region Taxi Socket Event
  const onNewMotobikeTaxi = useCallback(
    (callback: (data: any) => void) => {
      socket.removeListener(EventSocketType.NEW_MOTOBIKE_TAXI);
      socket.on(EventSocketType.NEW_MOTOBIKE_TAXI, callback);
    },
    [socket],
  );
  const onAcceptMotobikeTaxiSocket = useCallback(
    ({ motorcycleTaxiId }) => {
      if (motorcycleTaxiId) {
        socket.emit(EventSocketType.ACCEPT_MOTOBIKE_TAXI, {
          motorcycleTaxiId,
        });
      }
    },
    [socket],
  );
  //#endregion

  useEffect(() => {
    socket.on(EventSocketType.ERROR, data => {
      switch (data.error_code) {
        case 'ORDER_ALREADY_ACCEPTED_BY_DRIVER':
          Alert.alert('Nhận đơn thất bại', 'Đã có tài xế khác nhận đơn', [
            {
              text: 'Đóng',
              onPress: () => {},
              style: 'cancel',
            },
          ]);
          break;

        default:
          Alert.alert(
            'Lỗi',
            data?.message || 'Hệ thống đang bận vui lòng thử lại sau',
            [
              {
                text: 'Đóng',
                onPress: () => {},
                style: 'cancel',
              },
            ],
          );
          break;
      }
    });
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    onConnectError(err => {
      console.log(
        '🚀 ~ file: useDriverSocket.ts:51 ~ onConnectError ~ err:',
        err,
      );
    });
  }, []);

  const connect = useCallback(() => {
    socket.connect();
  }, [socket]);
  const disconnect = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    if (socket) {
      activitees({
        lat: locationUser?.lat,
        long: locationUser?.long,
      });
    }
  }, [locationUser, locationUser?.lat, locationUser?.long, socket]);

  return {
    isConnected,
    connect,
    disconnect,
    onNewOrder,
    onAcceptOrderSocket,
    onRestaurantDoneOrder,
    onConnectError,
    onNewMotobikeTaxi,
    onAcceptMotobikeTaxiSocket,
    activitees,
  };
};
