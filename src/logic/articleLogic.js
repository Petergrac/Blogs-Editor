import { redirect } from "react-router-dom";
import api from "../api/api.js";
// Published
async function handlePublish(post) {
  try {
    await api.patch(`http://localhost:3000/api/posts/${post.id}/publish`, {
      status: "PUBLISHED",
    });
    alert("Post published!");
  } catch (error) {
    console.error("Error saving post:", error);
    alert("Failed to save post.");
  }
}
//   Delete
const handleDelete = async (post) => {
  try {
    const res = await api.delete(`http://localhost:3000/api/posts/${post.id}`);
    alert(res.data.message);
    redirect(`/home/drafts`);
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post.");
  }
};
// Add a new post
const handleNewPost = async (editorRef, title, status) => {
  if (editorRef.current) {
    const content = editorRef.current.getContent();
    try {
      await api.post("http://localhost:3000/api/posts", {
        title,
        content,
        status,
      });
      alert("Post saved!");
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post.");
    }
  }
};
// Get Post by id
const handlePostById = async (id) => {
  const res = await api.get(`http://localhost:3000/api/posts/${id}`);
  return res.data.post;
};

// Update the post
const handleUpdate = async (editorRef, title, status, id) => {
  if (editorRef.current) {
    const content = editorRef.current.getContent();
    try {
      const res = await api.patch(`http://localhost:3000/api/posts/${id}`, {
        title,
        content,
        status,
      });
      if(res.data){
        return true
      }
      return false;
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
