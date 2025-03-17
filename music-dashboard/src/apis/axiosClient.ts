import axios from "axios";
import { createBackendUrl } from "../configs/app-config";

const axiosClent = axios.create({
  baseURL: createBackendUrl("/api/v1"),
});

axiosClent.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClent.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error?.response?.data || error);
  }
);

export default axiosClent;
