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
  try {
    const res = await api.get("http://localhost:3000/api/posts/published");
    return res.data.posts;
  } catch (error) {
    console.error("Error happened in the api", error.message);
  }
}

// Get all Drafts
async function getAllDrafts() {
  try {
    const res = await api.get("http://localhost:3000/api/posts/drafts");
    return res.data.drafts;
  } catch (error) {
    console.error("Error happened in the api", error.message);
  }
}

export { getPublishedPosts, getAllDrafts };
