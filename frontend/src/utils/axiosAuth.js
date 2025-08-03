import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

//request interceptor to add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error statuses
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/"; // Redirect to login on unauthorized
          break;
        case 403:
          console.error("Forbidden"); // Forbidden - show a message
          break;
        case 404:
          console.error("Not Found"); // Not Found - show a message
          break;
        case 500:
          console.error("Internal Server Error");
          break;
        default:
          // Other errors
          break;
      }
    }else if(error.code === 'ECONNABORTED') {
        console.error("Request timed out. Please try again later.");
      }
    return Promise.reject(error);
  }
);
export default axiosInstance;