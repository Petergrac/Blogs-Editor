import axios from "axios";

const api = axios.create({ baseURL: "http://10.71.60.224:3000/api" });

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
  const res = await api.get("http://10.71.60.224:3000/api/posts/published");
  return res.data.posts;
}

// Get all Drafts
async function getAllDrafts() {
  const res = await api.get("http://10.71.60.224:3000/api/posts/drafts");
  return res.data.drafts;
}

// Fetch user details
async function getUserDetails(id) {
    const res = await api.get(`/me/${id}`);
    return res.data.user;
}
export { getPublishedPosts, getAllDrafts,getUserDetails };
