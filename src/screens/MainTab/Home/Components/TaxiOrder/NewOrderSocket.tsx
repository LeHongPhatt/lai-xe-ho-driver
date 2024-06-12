import Icon from 'assets/svg/Icon';
import {
  BottomSheetCommon,
  Buttons,
  Divider,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BaseStyle, Colors } from 'theme';
import { IRefBottom, ITaxiItem, TaxiDeviceEvent, TaxiVehicle } from 'types';
import OrderItemBody from './OrderItemBody';
import { DeviceEventEmitter } from 'react-native';
interface IProps {
  onNewMotobikeTaxi: (callback: (data: any) => void) => void;
  onAcceptMotobikeTaxiSocket: ({
    motorcycleTaxiId,
  }: {
    motorcycleTaxiId: any;
  }) => void;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  activitees: ({ lat, long }: { lat: any; long: any }) => void;
}
const NewOrderSocket = (props: IProps) => {
  const ref = useRef<IRefBottom>(null);
  const [counter, setCounter] = useState(30);
  const [order, setOrder] = useState<ITaxiItem | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  //#region Func
  const defaultState = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setOrder(null);
    setCounter(30);
  }, []);

  const onNewMotobikeTaxiReceive = useCallback(data => {
    if (data.result && Array.isArray(data.result) && data.result.length > 0) {
      setOrder(data.result[0]);
    }
  }, []);

  const onClickAccept = useCallback(() => {
    if (order) {
      props.onAcceptMotobikeTaxiSocket({ motorcycleTaxiId: order.id });
      defaultState();
      DeviceEventEmitter.emit(TaxiDeviceEvent.ON_ACCEPT_NEW_ORDER);
    }
  }, [order]);

  const startCountDown = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = setInterval(() => {
      setCounter(pre => {
        if (pre > 0) {
          return pre - 1;
        }
        return pre;
      });
    }, 1000);
  }, []);
  //#endregion

  //#region Render fuc
  const renderButton = useMemo(() => {
    return (
      <Buttons mt-32 onPress={onClickAccept}>
        <TextCus useI18n heading5 color-white>
          Nhận cuốc
        </TextCus>
        <TextCus heading5 color-white>{` (${counter}s)`}</TextCus>
      </Buttons>
    );
  }, [onClickAccept, counter]);
  //#endregion

  //#region Watch change
  useEffect(() => {
    if (order) {
      startCountDown();
    }
  }, [order]);

  useEffect(() => {
    if (counter === 0) {
      defaultState();
    }
  }, [counter]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (props.isConnected) {
      props.onNewMotobikeTaxi(onNewMotobikeTaxiReceive);
    }
  }, [props.isConnected]);
  //#endregion
  if (order) {
    return (
      <BottomSheetCommon ref={ref} hideBackdrop={false} index={0}>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mx-16 mb-16>
          <TextCus useI18n heading4>
            Cuốc xe mới
          </TextCus>
          <TouchCus onPress={() => {}}>
            <Icon.Close />
          </TouchCus>
        </ViewCus>
        <ViewCus style={[]} mx-16 mb-16>
          {order && <OrderItemBody item={order} />}

          {renderButton}
        </ViewCus>
      </BottomSheetCommon>
    );
  }
  return <></>;
};

export default NewOrderSocket;
