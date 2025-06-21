import env from "@/config/env";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: env.API_URL,
  timeout: 60 * 1000,
  withCredentials: true,
  headers,
});

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
