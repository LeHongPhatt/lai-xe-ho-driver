import Icon from 'assets/svg/Icon';
import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { IOrderItem, IRestaurant } from 'types';
import { formatMoney } from 'utils';

interface OrderListProps {
  orderDetail?: IOrderItem & { restaurant: IRestaurant };
}

const OrderList: React.FC<OrderListProps> = props => {
  return (
    <ViewCus style={styles.boxInfo}>
      <ViewCus flex-row justify-space-between>
        <ViewCus flex-row items-center>
          <Icon.Maker />
          <TextCus ml-8 bold>
            Lấy hàng
          </TextCus>
        </ViewCus>
        <TextCus bold>3.4km - 6 phút</TextCus>
      </ViewCus>
      <ViewCus mt-8 items-center justify-center>
        <TextCus color-black3A style={styles.nameShop}>
          {props.orderDetail?.restaurant?.name}
        </TextCus>
        <ViewCus flex-row items-center>
          <Icon.Location />

          <TextCus ml-12> {props.orderDetail?.restaurant?.address}</TextCus>
        </ViewCus>
      </ViewCus>
      <ViewCus mt-24 style={styles.listOrder} flex-row justify-space-between>
        <ViewCus flex-row>
          <TextCus color-black3A bold>
            Chi tiết đơn hàng{' '}
            <TextCus color-grey85>
              ({props.orderDetail?.order_items?.length} món)
            </TextCus>
          </TextCus>
        </ViewCus>
        <ViewCus style={[styles.divide, { width: '48%' }]} />
      </ViewCus>

      <ViewCus mt-12>
        {props.orderDetail?.order_items?.map((item, index) => (
          <ViewCus px-22 key={index} style={styles.itemContainer}>
            <ViewCus flex-row>
              <TextCus
                color-black3A
                bold
                mr-4
                style={styles.itemName}>{`${item.quantity}x`}</TextCus>
              <TextCus
                color-black3A
                style={styles.itemName}>{`${item.item_name}`}</TextCus>
            </ViewCus>
            <TextCus color-grey85 style={styles.itemPrice}>
              {formatMoney(item.price)}
            </TextCus>
          </ViewCus>
        ))}
      </ViewCus>

      <ViewCus style={styles.infoMoney}>
        <ViewCus px-22 style={styles.line} />
        <ViewCus flex-row justify-space-between>
          <ViewCus>
            <TextCus color-orangeFF style={styles.textTotalPaid}>
              Tổng trả quán
            </TextCus>
          </ViewCus>
          <ViewCus>
            <TextCus color-orangeFF bold style={styles.textTotalPaid}>
              {formatMoney(props.orderDetail?.order_price ?? 0)}
            </TextCus>
          </ViewCus>
        </ViewCus>
        <ViewCus px-22 style={styles.line} />
      </ViewCus>

      <ViewCus flex-row justify-space-between style={styles.infoMoney}>
        <ViewCus mt-8>
          <TextCus bold style={styles.titleTextNote}>
            Ghi chú
          </TextCus>
          <TextCus color-black3A style={styles.textNote}>
            {props.orderDetail?.note}
          </TextCus>
        </ViewCus>
      </ViewCus>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  listOrder: {
    alignItems: 'center',
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
  divide: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.greyEE,
    height: 1,
    marginVertical: 4,
  },
  infoMoney: { width: '100%', paddingHorizontal: 22, marginTop: 4 },
  time: {
    fontSize: 12,
    lineHeight: 20,
  },
  nameShop: {
    fontSize: 18,
    lineHeight: 24,
  },
  textTotalPaid: {
    fontSize: 18,
    lineHeight: 24,
  },
  titleTextNote: {
    fontSize: 14,
    lineHeight: 24,
  },
  textNote: {
    fontSize: 16,
    lineHeight: 24,
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
  line: {
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 0.5,
    paddingHorizontal: 22,
    borderColor: Colors.greyAD,
    borderStyle: 'dashed',
  },
});

export default OrderList;
