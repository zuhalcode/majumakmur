import env from "@/config/env";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: 60 * 1000,
  withCredentials: true,
  headers,
});

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
