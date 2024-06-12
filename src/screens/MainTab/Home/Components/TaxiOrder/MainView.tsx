import React, { useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { TextCus, TouchCus, ViewCus } from 'components';
import { Colors, FontWeight } from 'theme';

import OrderList from './OrderList';
import { PROCESS_TAB_TAXI_ORDER } from 'types';

const MainView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState(PROCESS_TAB_TAXI_ORDER);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'process': {
        return <OrderList />;
      }

      case 'history': {
        return <></>;
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
        initialLayout={{ width: layout.width }}
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

export default MainView;
