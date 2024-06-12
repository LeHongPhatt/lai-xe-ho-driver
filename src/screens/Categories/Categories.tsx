import { RouteProp, useRoute } from '@react-navigation/native';
import { IconName } from 'assets';
import {
  RNFlatList,
  HomeLayout,
  IconApp,
  TextCus,
  TextInputs,
  TouchCus,
  ViewCus,
  Nodata,
} from 'components';
import { useCategories } from 'hooks/useCategories';
import { NavigationService, RootStackParamList, Routes } from 'navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import { ENodata, IRestaurant } from 'types';
import { dataDefaults, width } from 'utils';
import { CategoryItem } from './components';

const Categories: React.FC = () => {
  const { getListRestaurants, listRestaurants, loading } = useCategories();
  const route = useRoute<RouteProp<RootStackParamList, 'Categoires'>>();
  const [searchText, setSearchText] = useState(route.params?.searchText ?? '');
  const [isShowSearch, setIsShowSearch] = useState(
    route.params?.searchText.length ? true : false,
  );

  useEffect(() => {
    getListRestaurants({
      page: 1,
      limit: 10,
      distance: 7000,
    });
  }, [getListRestaurants]);
  const onHandleSearch = useCallback(() => {
    setIsShowSearch(true);
  }, []);
  const onClearInput = useCallback(() => {
    setSearchText('');
  }, []);
  const onBlurInput = useCallback(() => {}, []);
  const renderSearchInput = useCallback(() => {
    if (!isShowSearch && searchText?.length === 0) {
      return (
        <TextCus useI18n heading5 style={{ color: Colors.white }}>
          {'Đồ ăn'}
        </TextCus>
      );
    }
    return (
      <ViewCus style={styles.wrapperSearch}>
        <TextInputs
          placeholder="category.place_search"
          onChangeText={setSearchText}
          style={styles.input}
          onBlur={onBlurInput}
          value={searchText}
        />
        <TouchCus onPress={onClearInput} style={styles.btnClear}>
          <IconApp name={IconName.Remove} size={20} color={Colors.disable} />
        </TouchCus>
      </ViewCus>
    );
  }, [onClearInput, onBlurInput, isShowSearch, searchText, setSearchText]);
  const renderRight = useCallback(() => {
    if (isShowSearch) {
      return null;
    }
    return (
      <TouchCus onPress={onHandleSearch}>
        <IconApp name={IconName.Search} size={20} color={Colors.white} />
      </TouchCus>
    );
  }, [onHandleSearch, isShowSearch]);
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        notGoBack: false,
        iconColor: Colors.white,
        renderRight: renderRight,
        renderCenter: () => renderSearchInput(),
        style: {
          height: 42,
        },
      }}>
      <ViewCus f-1 bg-white>
        <RNFlatList
          data={loading ? dataDefaults : listRestaurants}
          renderItem={({
            item,
            index,
          }: {
            item: IRestaurant;
            index: number;
          }) => (
            <CategoryItem
              key={index}
              {...item}
              onPress={() =>
                NavigationService.navigate(Routes.RestaurantDetail, {
                  restaurantId: item.id,
                })
              }
              loading={loading}
            />
          )}
          ListEmptyComponent={<Nodata iconName={ENodata.NODATA_FOOD} />}
        />
      </ViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  wrapperSearch: {
    position: 'relative',
    height: 30,
    right: -15,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 30,
  },
  input: {
    width: width / 1.25,
    borderWidth: 0,
    height: 30,
  },
  btnClear: {
    right: 10,
    bottom: 0,
    top: 5,
  },
});
export default Categories;
