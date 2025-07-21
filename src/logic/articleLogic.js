import api from "../api/api.js";
// Published
async function handlePublish(post) {
  try {
    const res = await api.patch(
      `/posts/${post.id}/publish`,
      {
        status: "PUBLISHED",
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error saving post:", error);
    alert("Failed to save post.");
  }
}
//   Delete
const handleDelete = async (post) => {
  try {
    const res = await api.delete(
      `/posts/${post.id}`
    );
    if (res.data) {
      return true;
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post.");
    return false;
  }
};
// Add a new post
const handleNewPost = async (editorRef, title, status) => {
  if (editorRef.current) {
    const content = editorRef.current.getContent();
    try {
      const res = await api.post("/posts", {
        title,
        content,
        status,
      });
      return res.data;
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
  }
};
// Get Post by id
const handlePostById = async (id) => {
  const res = await api.get(`/posts/${id}`);
  return res.data.post;
};

// Update the post
const handleUpdate = async (editorRef, title, status, id) => {
  if (editorRef.current) {
    const content = editorRef.current.getContent();
    try {
      const res = await api.patch(`/posts/${id}`, {
        title,
        content,
        status,
      });
      return res.data;
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
  }
};
export {
  handlePublish,
  handleDelete,
  handleNewPost,
  handlePostById,
  handleUpdate,
};
