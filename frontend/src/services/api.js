import axios from "axios"

// TODO: Change this base URL to your backend server URL
// For development: http://localhost:8000/api
// For production: https://your-backend-domain.com/api
const API_BASE_URL = "http://127.0.0.1:8000/api"    

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// API endpoints
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  refreshToken: () => api.post("/auth/refresh"),
}

export const searchAPI = {
  // TODO: Integrate with LLM for intelligent search
  searchResources: (query, filters) => api.get("/search", { params: { query, ...filters } }),
  getRecommendations: (userId) => api.get(`/recommendations/${userId}`),
  saveResource: (resourceData) => api.post("/resources/save", resourceData),
}

export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (profileData) => api.put("/user/profile", profileData),
  getUserResources: () => api.get("/user/resources"),
}

export default api
