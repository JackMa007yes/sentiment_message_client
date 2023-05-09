import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import storage from '@/utils/storage';

const http = axios.create({
  baseURL: '/api',
  timeout: 30000
});

http.interceptors.request.use(
  async function (config) {
    (config as any).headers.Authorization = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          storage.clearToken();
          if (location.href !== 'login') window.location.href = '/';
          break;
        default:
          enqueueSnackbar(error.response.data.message, { variant: 'error' });
          break;
      }
    } else {
      // Noop
    }

    return Promise.reject(error);
  }
);

export const getToken = () => {
  const value = storage.getToken();
  return value ? 'Bearer ' + value.token : '';
};

export default http;
