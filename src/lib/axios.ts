import { getAccessToken } from "@/app/utils/supabase/session";
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

// Add a request interceptor to include the access token in the Authorization header
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
