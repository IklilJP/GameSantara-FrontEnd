import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://10.10.102.115:8080/api", // IP Mirza
});
