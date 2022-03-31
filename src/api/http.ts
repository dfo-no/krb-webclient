import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const msWaitTime = 500;

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
  return instance;
};

const wait = <T>(value: T) => {
  if (process.env.NODE_ENV === 'development') {
    return new Promise<T>((resolve) => setTimeout(resolve, msWaitTime, value));
  }
  return Promise.resolve(value);
};

export const httpGet = async <T, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  const value = await getAxiosInstance().get<T, R>(url, {
    ...config,
    headers: {
      ...config?.headers
    }
  });
  return wait(value);
};

export const httpPost = async <T, R = AxiosResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  const value = await getAxiosInstance().post<T, R>(url, data, {
    ...config,
    headers: {
      ...config?.headers
    }
  });
  return wait(value);
};

export const httpPut = async <T, R = AxiosResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  const value = await getAxiosInstance().put<T, R>(url, data, {
    ...config,
    headers: {
      ...config?.headers
    }
  });
  return wait(value);
};

export const httpDelete = async <T, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  const value = await getAxiosInstance().delete<T, R>(url, {
    ...config,
    headers: {
      ...config?.headers
    }
  });
  return wait(value);
};
