/** @format */

import axios from 'axios';
import { useKey } from 'hooks';
import { KEY_CONTEXT } from './constants';
import { API_HOST } from '@env';
import { API_ENDPOINT } from 'utils';
import { configStore } from 'store/createStore';
import { logoutRequest } from 'store/user';

const config = {
  baseURL: API_HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const axiosClient = axios.create(config);

axiosClient.interceptors.request.use(
  async (req: any) => {
    const { getKeyStore } = useKey();
    const token = await getKeyStore(KEY_CONTEXT.ACCESS_TOKEN);

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (err: any) => Promise.reject(err),
);

axiosClient.interceptors.response.use(
  (res: any) => Promise.resolve(res.data),
  async (err: any) => {
    const originalRequest = err.config;

    if (
      err &&
      err.response &&
      err.response.status === 401 &&
      !err.config.__isRetryRequest
    ) {
      const { saveKeyStore } = useKey();
      const { store } = configStore();

      return axios
        .get(`${API_HOST}${API_ENDPOINT.GET_SESSION}`, {
          headers: config.headers,
        })
        .then(async (response: any) => {
          const { accessToken } = response?.data?.data?.result?.[0] || '';
          if (response?.data?.status !== 200) {
            // logoutRequest();
            return null;
          }
          console.log('axios-sucess', accessToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            authorization: `Bearer ${accessToken}`,
          };
          originalRequest.__isRetryRequest = true;
          await saveKeyStore(KEY_CONTEXT.ACCESS_TOKEN, accessToken);

          return axiosClient(originalRequest);
        })
        .catch(e => {
          console.log('axios-catch', JSON.stringify(e));
          store.dispatch(logoutRequest({ redirect: true }));
          // logoutRequest();
        });
    }
    return Promise.reject(((err || {}).response || {}).data);
  },
);

export default axiosClient;
