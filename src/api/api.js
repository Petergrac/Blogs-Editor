import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

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
    const res = await api.get("http://localhost:3000/api/posts/published");
    return res.data.posts;
}

// Get all Drafts
async function getAllDrafts() {
    const res = await api.get("http://localhost:3000/api/posts/drafts");
    return res.data.drafts;
}

export { getPublishedPosts, getAllDrafts };
