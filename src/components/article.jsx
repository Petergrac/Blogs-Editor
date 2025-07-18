import { useNavigate } from "react-router-dom";
import { handlePublish, handleDelete } from "../logic/articleLogic";
function Post({ post }) {
  const navigate = useNavigate()
  return (
    <div className="p-4 space-y-4 border mx-3 md:mx-10">
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
            onClick={() => handlePublish(post)}
          >
            Publish
          </button>
        )}
      </div>
      <button
        className="art-btn bg-rose-700"
        onClick={() => handleDelete(post)}
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
