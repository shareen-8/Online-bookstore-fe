import axios from "axios";

export const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: `${API_BASE_URL}/api`
});

// Attach token automatically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
