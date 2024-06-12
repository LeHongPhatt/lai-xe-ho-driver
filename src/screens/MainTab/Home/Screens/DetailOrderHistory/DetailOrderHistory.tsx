import { HomeLayout, ScrollViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import {
  // Timeline,
  OrderList,
  OrderStatus,
  OrderAccount,
  OrderDriverAccepted,
} from '../../Components/Order';

export default function DetailOrderHistory() {
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        title: 'order.title_detail',
        iconColor: Colors.white,
      }}>
      <ScrollViewCus contentContainerStyle={styles.container}>
        <OrderStatus />
        <OrderAccount />
        <OrderList />
        <OrderDriverAccepted />
      </ScrollViewCus>
    </HomeLayout>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.greyF7,
    paddingHorizontal: 16,
    paddingVertical: 22,
  },
  divide: {
    height: '100%',
    borderWidth: 0.5,
    borderColor: Colors.greyAD,
    marginVertical: 4,
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
  infoMoney: { width: '100%', paddingHorizontal: 22, marginTop: 4 },
  time: {
    fontSize: 12,
    lineHeight: 20,
  },
  textConfirm: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  buttonConfirm: {
    display: 'flex',
    borderRadius: 16,
    width: '82%',
  },
  boxCallHelp: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.black3A,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
