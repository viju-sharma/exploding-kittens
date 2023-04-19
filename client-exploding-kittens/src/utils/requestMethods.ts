import axios from "axios";
const BASE_URL = "/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    get: {
      // can be common or any other method
      Authorization: localStorage.getItem("token") || "",
    },
    post: {
      // can be common or any other method
      Authorization: localStorage.getItem("token") || "",
    },
  },
});
