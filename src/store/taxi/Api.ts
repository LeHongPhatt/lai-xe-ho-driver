import { createApi } from '@reduxjs/toolkit/query/react';

import { API_HOST } from '@env';
import axiosClient from 'utils/axios';
import { ITaxiItem, TaxiOrderStatus } from 'types';

const taxiApi = createApi({
  reducerPath: 'taxiApi',
  baseQuery: async requestOptions => {
    const rs = await axiosClient.request({
      baseURL: API_HOST,
      ...requestOptions,
    });

    return {
      data: rs,
      meta: undefined,
    };
  },

  endpoints: builder => {
    return {
      getList: builder.mutation({
        query: (data: { limit: Number; page: Number; status?: string[] }) => {
          return {
            url: 'driver/motorcycle-taxi/get-all',
            method: 'GET',
            params: data,
          };
        },
      }),
      updateOrderStatus: builder.mutation({
        query: (data: ITaxiItem) => {
          let rs: {
            url: string;
            method: string;
          } | null = {
            url: `driver/motorcycle-taxi/${data.id}/`,
            method: 'POST',
          };
          switch (data.status) {
            case TaxiOrderStatus.ACCEPTED:
              rs.url += 'arrived';
              break;
            case TaxiOrderStatus.DRIVER_ARRIVED:
              rs.url += 'en-route';
              break;
            case TaxiOrderStatus.IN_PROGRESS:
              rs.url += 'completed';
              break;
            default:
              rs = null;
              break;
          }
          return rs;
        },
      }),
      getDetail: builder.mutation({
        query: (id: string) => {
          return {
            url: `driver/motorcycle-taxi/get-detail/${id}/`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useGetListMutation,
  useUpdateOrderStatusMutation,
  useGetDetailMutation: useGetTaxiOrderDetailMutation,
} = taxiApi;

export default taxiApi;
