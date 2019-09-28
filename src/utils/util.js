import axios from 'axios';
import { createHashHistory } from 'history';

let baseURL = PRODUCT ? 'http://api.wesion.cn' : 'http://localhost:7001/';

const $http = axios.create({
  baseURL
});

$http.interceptors.request.use(
  config => {
    if (config.url == `/api/login`) {
      return config;
    }
    if (!getToken()) {
      return createHashHistory().push('/login');
    }
    config.headers = {
      'token': getToken(),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config;
  },
  error => {
    //请求错误时做些事
    return Promise.reject(error);
  }
);

$http.interceptors.response.use(
  response => {
    // 未登录或者过期
    if (response.data.code === '02') {
      return createHashHistory().push('/login');
    }
    return response.data;
  },
  error => {
  }
)

function getToken() {
  return localStorage.getItem('token');
}

function setToken(data) {
  localStorage.setItem('token', data);
}

function removeToken() {
  localStorage.clear();
}

export {
  $http,
  setToken,
  removeToken
};