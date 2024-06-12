import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from 'store/order';
import { OrderSelectors, OrderQuery } from 'store/order';
import { IOrderItem } from 'types';
import { API_ENDPOINT } from 'utils';
import { useLocation } from './useLocation';
import { OrderStatus, ProcessingOrderStatus } from 'types';
import { changeRestStatus } from 'store/user';
import { getAttrByKey as getAttrByKeyUser } from 'store/user/Selector';
import { AlertCommon } from 'components';
import { useTranslation } from 'react-i18next';
const STATUS_TEXT = {
  false: 'Đang tạm nghỉ',
  true: 'Sẵn sàng nhận đơn',
};

export const useOrder = () => {
  const { locationUser } = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const page = useSelector(OrderSelectors.getAttrByKey('page'));
  const limit = useSelector(OrderSelectors.getAttrByKey('limit'));
  const loading = useSelector(OrderSelectors.getLoading);
  const processingData = useSelector(OrderSelectors.getProcessingData);

  const listOrder = useSelector(
    OrderSelectors.getAttrByKey('listOrder'),
  ) as IOrderItem[];

  const numOrderProcess = useMemo(() => {
    return processingData?.list?.length ?? 0;
  }, [processingData?.list]);

  const statusWorking = useSelector(getAttrByKeyUser('status'));
  const statusText = useMemo(() => {
    return STATUS_TEXT?.[statusWorking!!.toString()];
  }, [statusWorking]);

  /*
    PROCESSING_ORDER
  */
  const getListProcessingOrder = useCallback(() => {
    if (processingData.loading) {
      return;
    }
    dispatch(
      OrderActions.getListProcessingRequest({
        dataKey: 'listOrderProcessing',
        endPoint: API_ENDPOINT.ORDER.LIST_ORDER,
        params: {
          page: 1,
          limit: 10,
          lat: locationUser.lat,
          long: locationUser.long,
          status: ProcessingOrderStatus,
        },
      }),
    );
  }, [dispatch]);

  const onEndReachedListProcessingOrder = () => {
    if (processingData.loading || numOrderProcess === 0) {
      return;
    }

    dispatch(
      OrderActions.getListProcessingRequest({
        dataKey: 'listOrderProcessing',
        endPoint: API_ENDPOINT.ORDER.LIST_ORDER,
        params: {
          page: parseInt((processingData.page || 1) as any) + 1,
          limit: processingData.limit,
          lat: locationUser.lat,
          long: locationUser.long,
          status: ProcessingOrderStatus,
        },
      }),
    );
  };

  /*  GET ALL ORDER */
  const getListOrder = useCallback(() => {
    const statusArr = Object.values(OrderStatus);
    dispatch(
      OrderActions.getBaseActionsRequest({
        dataKey: 'listOrder',
        endPoint: API_ENDPOINT.ORDER.LIST_ORDER,
        params: {
          page: 1,
          limit: 10,
          lat: locationUser.lat,
          long: locationUser.long,
          status: statusArr,
        },
      }),
    );
  }, [dispatch]);

  const onEndReachedListOrder = () => {
    const statusArr = Object.values(OrderStatus);
    dispatch(
      OrderActions.getBaseActionsRequest({
        dataKey: 'listOrder',
        endPoint: API_ENDPOINT.ORDER.LIST_ORDER,
        params: {
          page: parseInt(page || (1 as any)) + 1,
          limit,
          lat: locationUser.lat,
          long: locationUser.long,
          status: statusArr,
        },
      }),
    );
  };

  const setStatusWorking = (s: boolean) => {
    dispatch(changeRestStatus(s));
  };

  const onChangeStatusWorking = () => {
    if (
      locationUser.lat === 0 &&
      locationUser.long === 0 &&
      statusWorking === false
    ) {
      AlertCommon(
        t('Vị trí xác định'),
        'Chưa thể vào ca vì ứng dụng chưa xác định được vị trí vui lòng đợi trong giây lát',
      );
      return;
    }
    setStatusWorking(!statusWorking);
  };

  const onUpdateStatusOrder = (
    { orderCode, status },
    cb?: (d: any) => void,
  ) => {
    const callback: any = res => {
      if (res.status === 200) {
        getListProcessingOrder();
        cb?.(res);
      }
    };
    const payload = {
      body: {
        orderCode,
      },
    };
    switch (status) {
      case OrderStatus.RESTAURANT_DONE: {
        dispatch(OrderActions.onPostConfirmPickedOrder(payload, callback));
        break;
      }
      case OrderStatus.DRIVER_DELIVERING: {
        dispatch(OrderActions.onPostConfirmDeliveredOrder(payload, callback));
        break;
      }
      default:
        break;
    }
  };

  return {
    getListOrder,
    loading,
    statusWorking,
    setStatusWorking,
    onChangeStatusWorking,
    statusText,
    listOrder,
    loadingProcessingList: processingData.loading,
    listOrderProcessing: processingData.list,
    numOrderProcess,
    onEndReachedListOrder,
    onUpdateStatusOrder,
    getListProcessingOrder,
    onEndReachedListProcessingOrder,
  };
};

export const useListOrder = (limit = 10, status?: OrderStatus[]) => {
  const { locationUser } = useLocation();
  //#region API
  const [fetch, { isLoading, data, error }] = OrderQuery.useGetListMutation();
  //#endregion

  //#region Screen State
  const [listDataTable, setListDataTable] = useState<IOrderItem[]>([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  //#endregion

  //#region Ref value
  const fetchDataRunning = useRef<ReturnType<typeof fetch> | null>(null);
  const hasNext = useRef(true);
  const page = useRef(1);
  //#endregion

  //#region Function
  const loadMore = useCallback(() => {
    if (!isLoading && hasNext.current) {
      fetchDataRunning.current = fetch({
        limit,
        page: page.current,
        status,
        lat: locationUser.lat,
        long: locationUser.long,
      });
    }
    if (!hasNext.current) {
      setIsRefreshing(false);
    }
  }, [isLoading, fetch, hasNext, locationUser, page]);

  /** Reset all value */
  const reset = useCallback(() => {
    setListDataTable([]);
    page.current = 1;
    hasNext.current = true;
  }, []);

  const refreshData = useCallback(() => {
    reset();
    setIsRefreshing(true);
    loadMore();
  }, [loadMore]);
  //#endregion

  //#region Handle API status
  useEffect(() => {
    if (data) {
      switch (data.status) {
        case 200:
          {
            let fetchData = data?.data;

            if (
              Array.isArray(fetchData?.orders) &&
              fetchData?.orders.length > 0
            ) {
              const listData = fetchData?.orders;
              const currentPage = fetchData?.currentPage;
              if (listData.length === 0) {
                hasNext.current = false;
              } else {
                if (listData.length < limit) {
                  hasNext.current = false;
                } else {
                  hasNext.current = true;
                }
                if (hasNext.current) {
                  page.current = (currentPage ?? page.current) + 1;
                }

                setListDataTable([...listDataTable, ...listData]);
              }
            } else {
              hasNext.current = false;
            }
          }
          break;

        default:
          break;
      }
    }

    setIsRefreshing(false);
  }, [data]);

  useEffect(() => {
    if (error) {
      if ((error as any).name === 'AbortError') {
        refreshData();
      }
    }
  }, [error]);
  //#endregion

  //#region Watch change
  //#endregion

  //#region Element view
  //#endregion

  return {
    listDataTable,
    isRefreshing,
    isLoading,
    refreshData,
    loadMore,
  };
};
