import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Loading from "./loadingComponent";
import { handleDelete, handlePublish } from "../logic/articleLogic";
import { useGSAP } from "@gsap/react";
import { useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import { useRef } from "react";
function Post({ post }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const articleRef = useRef();
  // Publish
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => handlePublish(post),
    onSuccess: () => navigate("/home/published"),
  });

  const publishPost = () => {
    mutate();
  };
  // Animation
  useGSAP(() => {
    gsap.from(articleRef.current, {
      y: -100,
      duration: 1,
      scale: 0.2,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, []);
  // Delete
  const { mutate: deleteMutate, error: deleteError } = useMutation({
    mutationFn: () => handleDelete(post),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
  if (isPending) return <Loading />;
  if (error) return <p className="none">Something went wrong</p>;
  
  const deletePost = () => {
    deleteMutate();
  };
  if (deleteError) {
    const status = error?.response?.status;
    if (status === 401) {
      return navigate("/");
    }
    return (
      <div className="flex min-h-screen justify-center items-center bg-slate-800">
        Error occurred and the post could not be deleted.
      </div>
    );
  }
  post;
  return (
    <div
      ref={articleRef}
      className="article-anim p-4 space-y-4 border border-white/25 mx-3 md:mx-10 rounded-md mb-4"
    >
      <div>
        <p className="text-2xl font-bold text-center">{post.title}</p>
        <div
          className="overflow-clip max-h-[100px]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.status === "PUBLISHED" ? (
          <p className="text-[#beef00] font-bold">Likes: {post.likes}</p>
        ) : (
          ""
        )}
        {post.status === "PUBLISHED" ? (
          ""
        ) : (
          <button
            className="art-btn  bg-blue-800  hover:bg-blue-900"
            onClick={() => publishPost(post)}
          >
            Publish
          </button>
        )}
      </div>
      <div>
        <p className="font-bold">
          Created At:{" "}
          <span className="text-[#43dc6e]">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </p>
        <p className="font-bold">
          Updated At:
          <span className="text-[#43d7dc]">
            {new Date(post.updatedAt).toLocaleString()}
          </span>
        </p>
        <p className="font-bold">
          Comments:
          <span className="text-[#dc4392]">{post._count.comments}</span>
        </p>
      </div>
      <button className="art-btn bg-rose-700" onClick={() => deletePost()}>
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
