import { handlePublish, handleDelete } from "../logic/articleLogic";
function Post({ post }) {
  return (
    <div className="p-4 space-y-4 border mx-3 md:mx-10">
      <div className="overflow-clip">
        <p className="text-2xl font-bold text-center">{post.title}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.status === "PUBLISHED" ? <p>{post.like}</p> : ""}
        {post.status === "PUBLISHED" ? (
          ""
        ) : (
          <button onClick={() => handlePublish(post)}>Publish</button>
        )}
      </div>
      <button onClick={() => handleDelete(post)}>Delete</button>
      <button onClick={() => handlePublish(post)}>Edit</button>
    </div>
  );
}
export default Post;
