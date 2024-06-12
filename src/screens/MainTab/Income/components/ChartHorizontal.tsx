import { TextCus, ViewCus } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { formatMoney } from 'utils';

const Chart = ({ data }) => {
  if (!data) {
    return;
  }
  const maxMoney = Math.max(...data.map(item => item.money));

  return (
    <ViewCus style={styles.containerChart}>
      {data.map(item => (
        <ViewCus mb-8 style={[BaseStyle.flexRowSpaceBetwwen]} key={item.id}>
          <TextCus style={styles.date}>{item.time}</TextCus>
          <ViewCus style={styles.chart}>
            <ViewCus
              style={[
                styles.chartBar,
                { width: `${(item.money / maxMoney) * 100}%` },
              ]}
            />
          </ViewCus>
          <TextCus style={styles.money}>{formatMoney(item.money)}</TextCus>
        </ViewCus>
      ))}
    </ViewCus>
  );
};
// --------------

type TimeShowVN = 'Ngày' | 'Tuần' | 'Tháng';

interface ChartHorizontalProps {
  time: TimeShowVN;
  listTime: { id: number; time: string; money: number }[];
}

const ChartHorizontal: React.FC<ChartHorizontalProps> = ({
  time = 'Ngày',
  listTime = [],
}) => {
  return (
    <ViewCus>
      <ViewCus style={styles.header} flex-row justify-space-between>
        <TextCus>{time}</TextCus>
        <TextCus>Thu nhập</TextCus>
      </ViewCus>
      <Chart data={listTime} />
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 12,
  },

  containerChart: {
    flex: 1,
    paddingVertical: 8,
  },
  date: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.grey85,
    marginRight: 6,
  },
  chart: {
    flex: 4,
    height: 16,
    backgroundColor: Colors.white,
    marginRight: 8,
  },
  chartBar: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  money: {
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.grey85,
  },
});

export default ChartHorizontal;
