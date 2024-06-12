import React, { useEffect } from 'react';
import {
  BottomSheetCommon,
  TextCus,
  ViewCus,
  Divider,
  TouchCus,
} from 'components';
import { BaseStyle, Colors } from 'theme';
import { IOrderItem } from 'types';

import NewOrderConfirm from './NewOrderConfirm';
import Icon from 'assets/svg/Icon';

interface IProps {
  newOrder: IOrderItem;
  onAcceptOrder: (data: any) => void;
  onRejectOrder: () => void;
}

const BottomSheetNewOrder: React.FC<IProps> = ({
  newOrder,
  onAcceptOrder,
  onRejectOrder,
}) => {
  const [counter, setCounter] = React.useState(30);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      onPressClose();
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [counter]);
  const onPressClose = () => {
    onRejectOrder();
  };

  return (
    <BottomSheetCommon hideBackdrop={false} index={0}>
      <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]} mx-16 mb-16>
        <TextCus useI18n heading4>
          order.new_order
        </TextCus>
        <TouchCus onPress={onPressClose}>
          <Icon.Close />
        </TouchCus>
      </ViewCus>
      <NewOrderConfirm
        order={newOrder as any}
        onAcceptOrder={onAcceptOrder}
        counter={counter}
      />
    </BottomSheetCommon>
  );
};

export default BottomSheetNewOrder;
