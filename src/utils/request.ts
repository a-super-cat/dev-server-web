import axios from 'axios';
import router from '../router/index';

const axiosInstance = axios.create({
  baseURL: `/${import.meta.env.APP_API_PREFIX}`,
  timeout: 3000,
});

// const refreshToken = () => {
//   return axiosInstance({
//     url: '/refreshToken',
//     method: 'GET',
//   });
// }

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// 在发送请求前
axiosInstance.interceptors.request.use( async (config: any) => {
  // config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
  return config
},
  (error) => {
    return Promise.reject(error)
  }
);
// 返回请求后
axiosInstance.interceptors.response.use(config => {
  if (config.headers['content-type'] === 'application/octet-stream;charset=utf-8') {
    console.log('文件流', config)
    return config
  } else {
    if (config.data.code === 401) {
      window.sessionStorage.clear()
      router.replace({
        path: '/'
      })
    } else {
      // 在最后必须return
      return config.data
    }
  }
},
  (error) => {
    return Promise.reject(error)
  }
);


export default axiosInstance;

export function defineRequest(url: string, method = 'GET', options = {}) {
  return (data?: any) => {
    const tmp = method === 'GET' ? { params: data } : { data };
    return axiosInstance({
      ...options,
      url,
      method,
      ...tmp,
    });
  };
}