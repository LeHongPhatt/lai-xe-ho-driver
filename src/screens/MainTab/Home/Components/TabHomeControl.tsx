import { useOrder } from 'hooks';
import React, { useEffect } from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { Colors, FontWeight } from 'theme';
import { TabOrder } from './Order';
import { TextCus, TouchCus, ViewCus } from 'components';
import { TaxiTab } from './TaxiOrder';
import { TaxiDeviceEvent } from 'types';

const TabHomeControl = () => {
  const {
    getListProcessingOrder,
    listOrderProcessing,
    onEndReachedListProcessingOrder,
    numOrderProcess,
    onUpdateStatusOrder,
    loadingProcessingList,
  } = useOrder();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'order', title: 'Giao hàng' },
    { key: 'taxi', title: 'Tài xế' },
  ]);

  //#region Handle func
  const onRefresh = () => {
    getListProcessingOrder();
  };
  const onEndReached = () => {
    onEndReachedListProcessingOrder();
  };
  const onPressUpdateStatusOrder = ({ orderCode, status }) => {
    onUpdateStatusOrder({ orderCode, status });
  };
  //#endregion

  //#region Render Func
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'order': {
        return (
          <TabOrder
            listOrder={listOrderProcessing}
            numOrderProcess={numOrderProcess}
            onRefresh={onRefresh}
            isRefreshing={loadingProcessingList}
            onEndReached={onEndReached}
            onPressUpdateStatusOrder={onPressUpdateStatusOrder}
          />
        );
      }

      case 'taxi': {
        return <TaxiTab />;
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
  //#endregion

  //#region Wacth change

  useEffect(() => {
    const listen = DeviceEventEmitter.addListener(
      TaxiDeviceEvent.ON_ACCEPT_NEW_ORDER,
      () => {
        setIndex(1);
      },
    );
    return () => {
      listen.remove();
    };
  }, []);
  //#endregion

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  selectedTabItem: {
    borderBottomColor: Colors.main,
    borderBottomWidth: 5,
    borderRadius: 0,
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

export default TabHomeControl;
