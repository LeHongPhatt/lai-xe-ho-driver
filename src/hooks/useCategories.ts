import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesSelectors } from 'store/categories';
import * as CategoriesActions from 'store/categories';
import {
  IExtraFood,
  IFood,
  IFoodCatalog,
  IListFoodParams,
  IPage,
  IRestaurant,
  IRestaurantDetail,
} from 'types';
import { API_ENDPOINT } from 'utils';
import { useLocation } from './useLocation';
export const useCategories = () => {
  const dispatch = useDispatch();
  const { locationUser } = useLocation();
  const loading = useSelector(CategoriesSelectors.getLoading);
  const listRestaurants = useSelector(
    CategoriesSelectors.getAttrByKey('listRestaurants'),
  ) as IRestaurant[];

  const detailRestaurant = useSelector(
    CategoriesSelectors.getAttrByKey('detailRestaurant'),
  ) as IRestaurantDetail;
  const listFoodCatalog = useSelector(
    CategoriesSelectors.getAttrByKey('listFoodCatalog'),
  ) as IFoodCatalog[];
  const listFoods = useSelector(
    CategoriesSelectors.getAttrByKey('listFoods'),
  ) as IFood[];
  const listExtraFood = useSelector(
    CategoriesSelectors.getAttrByKey('listExtraFood'),
  ) as IExtraFood;

  const getListRestaurants = useCallback(
    ({ ...rest }: IPage) => {
      dispatch(
        CategoriesActions.getBaseActionsRequest({
          dataKey: 'listRestaurants',
          endPoint: API_ENDPOINT.CATEGORY.RESTAURANT,
          params: { ...locationUser, ...rest },
        }),
      );
    },
    [dispatch, locationUser],
  );
  const getDetailRestaurant = useCallback(
    (restaurantId: string) => {
      dispatch(
        CategoriesActions.getBaseActionsRequest({
          dataKey: 'detailRestaurant',
          endPoint:
            API_ENDPOINT.CATEGORY.DETAIL_RESTAURANT + `/${restaurantId}`,
          isObject: true,
          type: CategoriesActions.CategoriesActions.GET_DETAIL_RESTAURANT,
        }),
      );
    },
    [dispatch],
  );
  const getListFoodCatalog = useCallback((restaurantId: string) => {
    dispatch(
      CategoriesActions.getBaseActionsRequest({
        dataKey: 'listFoodCatalog',
        endPoint: API_ENDPOINT.CATEGORY.LIST_FOOD_CATALOG + `/${restaurantId}`,
        type: CategoriesActions.CategoriesActions.GET_LIST_CATALOG_FOOD,
      }),
    );
  }, []);
  const getListFoods = useCallback(({ ...rest }: IListFoodParams) => {
    dispatch(
      CategoriesActions.getBaseActionsRequest({
        endPoint: API_ENDPOINT.CATEGORY.LIST_FOOD,
        params: { ...rest },
        dataKey: 'listFoods',
        type: CategoriesActions.CategoriesActions.GET_LIST_FOOD,
      }),
    );
  }, []);
  const getExtraFood = useCallback((foodId: string) => {
    dispatch(
      CategoriesActions.getBaseActionsRequest({
        endPoint: API_ENDPOINT.CATEGORY.EXTRA_FOOD + `/${foodId}`,
        dataKey: 'listExtraFood',
        isObject: true,
      }),
    );
  }, []);
  console.log('loading', loading);
  return {
    detailRestaurant,
    listFoodCatalog,
    listFoods,
    listExtraFood,
    listRestaurants,
    loading,
    getListRestaurants,
    getDetailRestaurant,
    getListFoodCatalog,
    getListFoods,
    getExtraFood,
  };
};
