import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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

const httpGet = <T, R = AxiosResponse<T>>(
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

const httpPost = <T, R = AxiosResponse<T>>(
  url: string,
  data?: T,
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

const httpPut = <T, R = AxiosResponse<T>>(
  url: string,
  data?: T,
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

const httpDelete = <T, R = AxiosResponse<T>>(
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

export { httpGet, httpPost, httpPut, httpDelete };
