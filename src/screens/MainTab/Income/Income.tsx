import {
  Buttons,
  Divider,
  HomeLayout,
  ScrollViewCus,
  TextCus,
  ViewCus,
} from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, FontWeight } from 'theme';

import { formatDateddMMyyy, formatMoney, formatTimeHHmm } from 'utils';
import { CalendarScreen, NotFoundData } from './components';
import ChartHorizontal from './components/ChartHorizontal';

const dummyData = [
  {
    id: 1,
    time: '01/05',
    money: 340000,
  },
  {
    id: 2,
    time: '02/05',
    money: 140000,
  },
  {
    id: 3,
    time: '03/05',
    money: 240000,
  },
  {
    id: 4,
    time: '04/05',
    money: 840000,
  },
  {
    id: 5,
    time: '05/05',
    money: 32000,
  },
];

export default function Income({ timeUpdated }) {
  timeUpdated = new Date(); // need update when fetch API

  const noData = false; // need update when fetch API

  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        notGoBack: true,
        title: 'account.income',
        iconColor: Colors.white,
      }}>
      <ScrollViewCus contentContainerStyle={styles.container}>
        <ViewCus
          flex-row
          justify-space-between
          py-14
          px-22
          items-center
          style={styles.boxHeader}>
          <TextCus>{`Bạn có thể nhận được ${formatMoney(649484)}`}</TextCus>
          <Buttons
            style={[styles.btnAction]}
            onPress={() => {}}
            disabled={false}>
            <TextCus useI18n color-white style={styles.textWallet}>
              account.wallet
            </TextCus>
          </Buttons>
        </ViewCus>
        {/* Calendar */}
        <CalendarScreen
          onDataSelected={e => {
            console.log('🚀 ~ file: Income.tsx:78 ~ Income ~ e:', e);
          }}
        />

        {noData ? (
          <NotFoundData />
        ) : (
          <>
            <ViewCus style={styles.boxUpdated} py-7 items-center>
              <TextCus style={styles.textUpdated}>
                {`Dữ liệu được cập nhật lúc ${formatTimeHHmm(
                  timeUpdated,
                )} vào ${formatDateddMMyyy(timeUpdated)}`}
              </TextCus>
            </ViewCus>
            <ViewCus mt-12 style={styles.boxContent}>
              <TextCus style={styles.textIncome}>
                Thu nhập ngày tạm tính
              </TextCus>
              <TextCus mt-4 style={styles.textMoney}>
                {formatMoney(34000)}
              </TextCus>
              <Divider small color={Colors.greyEE} style={styles.divide} />
              {/*  Chart Horizontal  */}
              <ChartHorizontal time={'Ngày'} listTime={dummyData} />
              <Divider small color={Colors.greyEE} style={styles.divide} />

              <ViewCus style={styles.header} flex-row justify-space-between>
                <TextCus>Thu nhập theo đơn</TextCus>
                <TextCus>21 đơn hàng</TextCus>
              </ViewCus>
              <ViewCus style={styles.header} flex-row justify-space-between>
                <TextCus>Phí giao hàng</TextCus>
                <TextCus>{formatMoney(345691)}</TextCus>
              </ViewCus>
              <ViewCus
                mb-12
                style={styles.header}
                flex-row
                justify-space-between>
                <TextCus>Tiền khách thưởng</TextCus>
                <TextCus>{formatMoney(47000)}</TextCus>
              </ViewCus>
              <Divider small color={Colors.greyEE} style={styles.divide} />

              <ViewCus style={styles.header} flex-row justify-space-between>
                <TextCus>Thưởng</TextCus>
              </ViewCus>
              <ViewCus style={styles.header} flex-row justify-space-between>
                <TextCus>Công ty thưởng</TextCus>
                <TextCus>0đ</TextCus>
              </ViewCus>
            </ViewCus>
          </>
        )}
      </ScrollViewCus>
    </HomeLayout>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 12,
  },
  divide: {},
  boxUpdated: {
    backgroundColor: Colors.blueED,
  },
  textUpdated: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.black3A,
  },
  textWallet: {
    fontSize: 14,
    lineHeight: 19,
  },
  btnAction: {
    width: 71,
    height: 28,
    borderRadius: 4,
  },
  boxHeader: {
    backgroundColor: Colors.redShadow03,
  },

  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  boxContent: {
    paddingHorizontal: 14,
    paddingTop: 3,
  },
  textIncome: {
    fontSize: 16,
    lineHeight: 18,
  },
  textMoney: {
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.black3A,
    paddingTop: 6,
  },
});
