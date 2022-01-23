import axios from 'axios';
import {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';

export const axiosMainInstance = axios.create();

const httpClient = (config = AxiosAuthRefreshRequestConfig) => {
  return new Promise((resolve, reject) => {
    axiosMainInstance({
      ...config,
      baseURL: 'http://localhost:8080/api',
      headers: {
        ...config.headers,
      }
    })
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default httpClient;
