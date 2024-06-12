import Icon from 'assets/svg/Icon';
import { TextCus, TouchCus, ViewCus } from 'components';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { IOrderItem } from 'types';
import { formatMoney, openLink } from 'utils';

interface OrderAccountProps {
  orderDetail?: IOrderItem;
}
const OrderAccount: React.FC<OrderAccountProps> = props => {
  const onCallPhone = useCallback(() => {
    openLink('telephone', `${props.orderDetail?.customer?.user_phone}`);
  }, [props]);

  return (
    <ViewCus style={styles.boxInfo}>
      <ViewCus flex-row justify-space-between>
        <ViewCus flex-row items-center>
          <Icon.Maker />
          <TextCus useI18n ml-8 bold>
            delivery.title
          </TextCus>
        </ViewCus>
        <TextCus bold>3.4km - 6 phút</TextCus>
      </ViewCus>
      <ViewCus mt-8 ml-18>
        <TextCus color-black3A style={styles.nameShop}>
          {props.orderDetail?.customer?.full_name}
        </TextCus>
        <ViewCus mt-4 flex-row items-center>
          <Icon.Location />
          <TextCus ml-12> {props.orderDetail?.customer?.address}</TextCus>
        </ViewCus>
        <ViewCus flex-row items-center>
          <Icon.Phone />
          <TouchCus
            // style={styles.wrapperContent}
            flex-row
            onPress={onCallPhone}>
            <TextCus ml-12> {props.orderDetail?.customer?.user_phone}</TextCus>
          </TouchCus>
        </ViewCus>
      </ViewCus>
      <ViewCus
        ml-18
        mt-24
        style={styles.listOrder}
        flex-row
        justify-space-between>
        <ViewCus flex-row>
          <TextCus color-black3A bold>
            Chi tiết
          </TextCus>
        </ViewCus>
        <ViewCus style={[styles.divide, { width: '80%' }]} />
      </ViewCus>
      <ViewCus mt-12>
        {[
          {
            name: 'Phí giao hàng (0.6 km)',
            price: props.orderDetail?.shipping_fee ?? 0,
          },
          {
            name: 'Phí nền tảng (thu hộ)',
            price: 1000,
          },
        ].map((item, index) => (
          <ViewCus px-22 key={index} style={styles.itemContainer}>
            <ViewCus flex-row>
              <TextCus
                color-black3A
                style={styles.itemName}>{`${item.name}`}</TextCus>
            </ViewCus>
            <TextCus color-grey85 style={styles.itemPrice}>
              {formatMoney(item.price)}
            </TextCus>
          </ViewCus>
        ))}
      </ViewCus>
      <ViewCus style={styles.infoMoney}>
        <ViewCus px-22 style={styles.line} />
        <ViewCus justify-space-between flex-row>
          <ViewCus>
            <TextCus color-orangeFF style={styles.textTotalPaid}>
              Thu tiền mặt
            </TextCus>
          </ViewCus>
          <ViewCus>
            <TextCus color-orangeFF bold style={styles.textTotalPaid}>
              {formatMoney(props.orderDetail?.total_price ?? 0)}
            </TextCus>
          </ViewCus>
        </ViewCus>
      </ViewCus>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  line: {
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 0.5,
    paddingHorizontal: 22,
    borderColor: Colors.greyAD,
    borderStyle: 'dashed',
  },
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
  infoMoney: {
    width: '100%',
    paddingHorizontal: 22,
    marginTop: 4,
  },
  nameShop: {
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'left',
  },
  textTotalPaid: {
    fontSize: 18,
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
});

export default OrderAccount;
