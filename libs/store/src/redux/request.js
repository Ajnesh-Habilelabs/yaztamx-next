import axios from 'axios';
import { apiUrl } from './config';
import { getLocalStorage } from "./localStore";

export default class Request {
  constructor(headers, token) {
    this.http = axios.create({
      baseURL: apiUrl,
      withCredentials: false,
    });

    const Token = getLocalStorage("Token");
    // console.log('Token :', Token);

    this.http.interceptors.request.use((config) => {
      config.headers = {
        Authorization: Token ? `Bearer ${Token}` : "",
        'Content-Type': 'application/json',
        // ...headers,
      };
      // console.log('config :', config);
      return config;
    });

    this.http.interceptors.response.use(
      function (response) {
        // console.log('response in request:', response);
        return [response.data, response.status];
      },
      function (error) {
        // console.log('error in request:', error);
        if (error.response) {
          if (error.response.status && error.response.status === 403) {
            // resetStack('login');
            return Promise.reject(error.response.data);
          } else {
            return Promise.reject(error.response.data);
          }
        } else if (error.request) {
          return Promise.reject(error.request);
        } else {
          return Promise.reject(error);
        }
      }
    );
    for (const method of ['get', 'post', 'put', 'delete', 'patch']) {
      this[method] = this.http[method];
    }
  }
}
