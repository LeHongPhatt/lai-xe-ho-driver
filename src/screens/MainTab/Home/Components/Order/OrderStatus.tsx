import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { IOrderItem, LableStatus } from 'types';
import { formatDate, formatMoney } from 'utils';

interface OrderDetailsProps {
  orderDetail?: IOrderItem;
}

const OrderStatus: React.FC<OrderDetailsProps> = props => {
  return (
    <ViewCus style={styles.boxInfo}>
      <TextCus color-blue47>
        {props.orderDetail?.status && (
          <>{LableStatus[props.orderDetail?.status]}...</>
        )}
      </TextCus>
      <ViewCus style={styles.divide} />
      <TextCus color-grey85 bold>
        Mã đơn:{' '}
        <TextCus color-black3A bold>
          {props.orderDetail?.order_code}
        </TextCus>
      </TextCus>
      <TextCus color-grey85 mb-4 style={styles.time}>
        Thời gian đặt:{' '}
        {formatDate(new Date(props.orderDetail?.createdAt ?? new Date()))}
        {/* 08:30, 08/08/2023 */}
      </TextCus>
      <ViewCus style={styles.divide} />
      <ViewCus flex-row justify-space-between style={styles.infoMoney}>
        <ViewCus>
          <TextCus>Trả quán</TextCus>
          <TextCus color-main bold>
            {props.orderDetail?.order_price &&
              formatMoney(props.orderDetail?.order_price)}
          </TextCus>
        </ViewCus>
        <ViewCus>
          <TextCus>Thu khách</TextCus>
          <TextCus color-blue47 bold>
            {formatMoney(props.orderDetail?.total_price ?? 0)}
          </TextCus>
        </ViewCus>
      </ViewCus>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
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
  divide: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.greyEE,
    marginVertical: 4,
  },
  infoMoney: { width: '100%', paddingHorizontal: 22, marginTop: 4 },
  time: {
    fontSize: 12,
    lineHeight: 20,
  },
});

export default OrderStatus;
