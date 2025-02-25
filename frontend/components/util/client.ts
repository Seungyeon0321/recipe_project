import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.16.181:5000",
  // baseURL: "http://192.168.134.181:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default client;
