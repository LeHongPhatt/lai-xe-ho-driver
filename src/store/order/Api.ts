import { createApi } from '@reduxjs/toolkit/query/react';

import { API_HOST } from '@env';
import axiosClient from 'utils/axios';
import { OrderStatus } from 'types';
import { API_ENDPOINT } from 'utils';

const orderApi = createApi({
  reducerPath: 'orderApi',
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
        query: (data: {
          limit: Number;
          page: Number;
          status?: OrderStatus[];
          lat: Number;
          long: Number;
        }) => {
          return {
            url: API_ENDPOINT.ORDER.LIST_ORDER,
            method: 'GET',
            params: data,
          };
        },
      }),
      getDetail: builder.mutation({
        query: (data: { orderCode: string }) => {
          return {
            url: `${API_ENDPOINT.ORDER.GET_DETAIL}/${data.orderCode}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useGetListMutation, useGetDetailMutation } = orderApi;

export default orderApi;
