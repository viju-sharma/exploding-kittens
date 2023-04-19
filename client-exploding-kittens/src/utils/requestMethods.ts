import axios from "axios";
const BASE_URL = "https://exploding-kitten-server-elal.onrender.com";
// const BASE_URL = "http://localhost:4444";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
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

