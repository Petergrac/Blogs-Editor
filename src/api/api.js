import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request Interceptor: Add Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 errors
api.interceptors.response.use(
  (response) => response, // Pass through if no error
  async (error) => {
    const originalRequest = error.config;

    // Check for authentication error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Fetch refresh-token
        const refreshToken = localStorage.getItem("refresh_token");
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh`,
          { refreshToken }
        );
        // Save the new access token
        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        // Navigate to login page if the refreshToken is expired too
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default api;

// Get all Posts
async function getPublishedPosts() {
  const res = await api.get(`/posts/published`);
  return res.data.posts;
}

// Get all Drafts
async function getAllDrafts() {
  const res = await api.get(`/posts/drafts`);
  return res.data.drafts;
}

// Fetch user details
async function getUserDetails(id) {
  const res = await api.get(`/me/${id}`);
  return res.data.user;
}
export { getPublishedPosts, getAllDrafts, getUserDetails };
