import axios from "axios";
import { BASE_URL } from "./constants";
import { store } from '../Shared/Redux/store'
export const HTTP_Request = axios.create({
  baseURL: BASE_URL,
});

HTTP_Request.interceptors.request.use(
  (config) => {
    const { user } = store.getState().root;
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const initialConfig = (user) => {
  // setupAxios(user);
};

