import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Loading from "./loadingComponent";
import { handleDelete, handlePublish } from "../logic/articleLogic";
function Post({ post }) {
  const navigate = useNavigate();
  // Publish
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => handlePublish(post),
    onSuccess: () => navigate("/home/published"),
  });
  
  const publishPost = () => {
    mutate();
  };
  if (isPending) return <Loading />;
  if (error) return <p className="none">Something went wrong</p>;
  // Delete
  const deletePost = async (post) => {
    const isDeleted = await handleDelete(post);
    if (isDeleted) {
      navigate("/home/published");
    }
    alert('Post was not deleted');
  }

  return (
    <div className="p-4 space-y-4 border border-white/25 mx-3 md:mx-10 rounded-md mb-4">
      <div>
        <p className="text-2xl font-bold text-center">{post.title}</p>
        <div
          className="overflow-clip max-h-[100px]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.status === "PUBLISHED" ? <p>{post.like}</p> : ""}
        {post.status === "PUBLISHED" ? (
          ""
        ) : (
          <button
            className="art-btn  bg-blue-800  hover:bg-blue-900"
            onClick={() =>publishPost(post)}
          >
            Publish
          </button>
        )}
      </div>
      <button
        className="art-btn bg-rose-700"
        onClick={() => deletePost(post)}
      >
        Delete
      </button>
      <button
        className="art-btn bg-cyan-700  hover:bg-cyan-800"
        onClick={() => navigate(`/edit/${post.id}`)}
      >
        Edit
      </button>
    </div>
  );
}
export default Post;
