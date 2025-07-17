import { redirect } from "react-router-dom";
import api from "../api/api.js";
// Published
async function handlePublish(post){
  try {
    await api.patch(`http://localhost:3000/api/posts/${post.id}/publish`, {
      status: "PUBLISHED",
    });
    alert("Post published!");
  } catch (error) {
    console.error("Error saving post:", error);
    alert("Failed to save post.");
  }
};
//   Delete
const handleDelete = async (post) => {
  try {
    const res = await api.delete(`http://localhost:3000/api/posts/${post.id}`);
    alert(res.data.message);
    redirect(`/home/${post.status}`);
  } catch (error) {
    console.error("Error deleting post:", error);
    alert("Failed to delete post.");
  }
};
export { handlePublish, handleDelete };