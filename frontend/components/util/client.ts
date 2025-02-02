import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.1.96:5000",
  // baseURL: "http://192.168.134.181:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
