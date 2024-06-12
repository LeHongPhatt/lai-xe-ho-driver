import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { formatMoney } from 'utils';

interface HistoryOrderListProps {}

interface OrderDetails {
  name: string;
  price: number;
}

const dummyData: OrderDetails[] = [
  {
    name: 'Thực lãnh (-20)',
    price: 150000,
  },
  {
    name: 'Tổng thu hộ',
    price: 140000,
  },
  {
    name: 'Phí dịch vụ',
    price: 16000,
  },
];

const HistoryOrderList: React.FC<HistoryOrderListProps> = () => {
  return (
    <ViewCus style={styles.boxInfo}>
      <ViewCus style={styles.itemContainer}>
        <ViewCus flex-row>
          <TextCus useI18n heading5 color-black3A bold>
            delivery.total_fee
          </TextCus>
        </ViewCus>
        <TextCus bold style={[styles.itemPrice, styles.green]}>
          {formatMoney(180000)}
        </TextCus>
      </ViewCus>
      <ViewCus mt-12>
        {dummyData.map((item, index) => (
          <ViewCus key={index}>
            <ViewCus style={[styles.divide]} />
            <ViewCus my-12 key={index} style={styles.itemContainer}>
              <ViewCus flex-row>
                <TextCus
                  color-black3A
                  style={styles.itemName}>{`${item.name}`}</TextCus>
              </ViewCus>
              <TextCus color-grey85 style={styles.itemPrice}>
                {formatMoney(item.price)}
              </TextCus>
            </ViewCus>
          </ViewCus>
        ))}
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
  },
  divide: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.greyEE,
    height: 1,
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
    color: Colors.black3A,
  },
  green: { color: Colors.success },
});

export default HistoryOrderList;
