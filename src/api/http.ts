import axios from 'axios';
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
    return response.data.data;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          storage.clearToken();
          // window.location.href = '/';
          break;
        default:
          // message.error(error.response.data.message);
          break;
      }
    } else {
      switch (error.code) {
        case 'ECONNABORTED':
          // message.error('请求超时！');
          break;
        default:
          break;
      }
    }

    return Promise.reject(error);
  }
);

export const getToken = () => {
  const value = storage.getToken();
  return value ? 'Bearer ' + value.token : '';
};

export default http;
