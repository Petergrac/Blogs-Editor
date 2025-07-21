import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL});

// Intercept the response
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
export { getPublishedPosts, getAllDrafts,getUserDetails };
