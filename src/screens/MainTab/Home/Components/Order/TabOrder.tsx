import React from 'react';
import { StyleSheet } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { TextCus, TouchCus, ViewCus } from 'components';
import { Colors, FontWeight } from 'theme';
import { PROCESS_TAB_ORDER, PROCESS_TAB_IDS } from 'types';

import ListOrder from './ListOrder';
import OrderHistoryTab from './OrderHistoryTab';

const TabOrder = ({
  listOrder,
  onPressUpdateStatusOrder,
  onRefresh,
  onEndReached,
  isRefreshing,
  numOrderProcess,
}) => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState(PROCESS_TAB_ORDER);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case PROCESS_TAB_IDS.PROCESSING: {
        return (
          <ListOrder
            data={listOrder}
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            onEndReached={onEndReached}
            onPressUpdateStatusOrder={onPressUpdateStatusOrder}
          />
        );
      }

      case PROCESS_TAB_IDS.HISTORY: {
        return <OrderHistoryTab />;
      }
      default:
        break;
    }
  };

  const renderTabBar = props => {
    return (
      <ViewCus style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const selectedItem = index === i;
          return (
            <TouchCus
              key={route.key}
              style={[styles.tabItem, selectedItem && styles.selectedTabItem]}
              onPress={() => setIndex(i)}>
              <TextCus>
                <TextCus
                  useI18n
                  style={[styles.label, selectedItem && styles.selectedLabel]}>
                  {route.title}
                </TextCus>
                <TextCus
                  style={[styles.label, selectedItem && styles.selectedLabel]}>
                  {route.key === PROCESS_TAB_IDS.PROCESSING
                    ? `(${numOrderProcess})`
                    : ''}
                </TextCus>
              </TextCus>
            </TouchCus>
          );
        })}
      </ViewCus>
    );
  };

  return (
    <ViewCus style={styles.tabContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        removeClippedSubviews={false}
      />
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  selectedTabItem: {
    backgroundColor: 'rgba(191, 30, 46, 0.15)',
  },
  label: {
    fontSize: 16,
    fontWeight: FontWeight.semibold,
    color: Colors.black3A,
  },
  selectedLabel: {
    color: Colors.main,
  },
});

export default TabOrder;
