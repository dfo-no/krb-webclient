import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
      'Content-type': 'application/json'
    }
  });
  instance.interceptors.request.use(
    (conf) => {
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};

const get = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return getAxiosInstance().get<T, R>(url, {
    ...config,
    headers: {
      ...config?.headers
      // Authorization: `Bearer ${authHandler.accessToken()}`
    }
  });
};

const post = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<R> => {
  return getAxiosInstance().post<T, R>(url, data, {
    ...config,
    headers: {
      ...config?.headers
      // Authorization: `Bearer ${authHandler.accessToken()}`
    }
  });
};

const put = <T = any, R = AxiosResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<R> => {
  return getAxiosInstance().put<T, R>(url, data, {
    ...config,
    headers: {
      ...config?.headers
      // Authorization: `Bearer ${authHandler.accessToken()}`
    }
  });
};

const del = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return getAxiosInstance().delete<T, R>(url, {
    ...config,
    headers: {
      ...config?.headers
      // Authorization: `Bearer ${authHandler.accessToken()}`
    }
  });
};

export { get, post, put, del };
