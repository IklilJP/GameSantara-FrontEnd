import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "http://10.10.102.115:8080/api/v1", // IP Mirza
  // baseURL: "http://10.10.102.137:8080/api", // IP PM Iklil
  // baseURL: "http://localhost:8080/api", // My IP
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      sessionStorage.getItem("authToken") || Cookies.get("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
