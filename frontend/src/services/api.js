import axios from "axios";

const API = axios.create({
  baseURL: "https://task-management-application-1-4yqp.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;