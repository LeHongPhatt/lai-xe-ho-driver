import { useCallback, useEffect, useRef, useState } from 'react';
import { TaxiQuery } from 'store/taxi';
import { useUpdateOrderStatusMutation } from 'store/taxi/Api';
import { ITaxiItem } from 'types/taxi';

export const useListTaxi = (limit = 10, status?: string[]) => {
  //#region API
  const [fetch, { isLoading, data, error }] = TaxiQuery.useGetListMutation();
  //#endregion

  //#region Screen State
  const [listDataTable, setListDataTable] = useState<ITaxiItem[]>([]);

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
      });
    }
    if (!hasNext.current) {
      setIsRefreshing(false);
    }
  }, [isLoading, fetch, hasNext, page]);

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
  }, []);
  //#endregion

  //#region Handle API status
  useEffect(() => {
    if (data) {
      switch (data.status) {
        case 200:
          {
            let fetchData = data?.data;

            if (
              Array.isArray(fetchData?.result) &&
              fetchData?.result.length > 0
            ) {
              const listData = fetchData?.result;
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

export const useTaxi = () => {
  const [
    fetchUpdateOrderStatus,
    { isLoading: isLoadingFetchUpdateOrderStatus },
  ] = useUpdateOrderStatusMutation();
  const updateOrderStatus = useCallback(
    (param: ITaxiItem, cb?: (d: any) => void) => {
      fetchUpdateOrderStatus(param).then(cb).catch(cb);
    },
    [],
  );

  return {
    updateOrderStatus,
    isLoadingFetchUpdateOrderStatus,
  };
};
