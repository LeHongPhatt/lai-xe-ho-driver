import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { IOrderItem } from 'types';
import { formatMoney } from 'utils';

interface OrderDriverAcceptedProps {
  orderDetail?: IOrderItem;
}

const OrderDriverAccepted: React.FC<OrderDriverAcceptedProps> = props => {
  return (
    <ViewCus style={styles.boxInfo}>
      <ViewCus flex-row justify-space-between>
        <ViewCus flex-row items-center>
          <TextCus useI18n ml-8 bold>
            delivery.receiver_biker
          </TextCus>
        </ViewCus>
      </ViewCus>
      <ViewCus mt-12>
        <ViewCus px-8 style={styles.itemContainer}>
          <ViewCus flex-row>
            <TextCus color-black3A style={styles.itemName}>
              Điểm thưởng
            </TextCus>
          </ViewCus>
          <TextCus color-grey85 style={styles.itemPrice}>
            {formatMoney(10000)}
          </TextCus>
        </ViewCus>
        <ViewCus style={[styles.divide, { width: '100%' }]} />
        <ViewCus px-8 style={styles.itemContainer}>
          <ViewCus flex-row>
            <TextCus color-black3A style={styles.itemName}>
              Phí ship
            </TextCus>
          </ViewCus>
          <TextCus color-grey85 style={styles.itemPrice}>
            {formatMoney(props.orderDetail?.shipping_fee ?? 0)}
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
    height: 1,
    marginVertical: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    lineHeight: 24,
  },
  itemPrice: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default OrderDriverAccepted;
