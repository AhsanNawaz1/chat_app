import axios from "axios";
import { BASE_URL } from "./constants";
export const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwiaWF0IjoxNjQxMjA0MjI2LCJ0eXBlIjoiYWNjZXNzIn0.vGBvzC7JLDOQakWpMSPRCmmalrJbhu5ZWNkQ_avx4Go'
const setupAxios = () => {

  HTTP_CLIENT.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (err) => Promise.reject(err)
  );
};
export const initialConfig = () => {
  setupAxios();
};

initialConfig()