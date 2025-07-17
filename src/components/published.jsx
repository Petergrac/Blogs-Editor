import { useQuery } from "@tanstack/react-query";
import { getPublishedPosts } from "../api/api";
import { useNavigate } from "react-router-dom";
import { lazy } from "react";
const Post = lazy(() => import("../components/article"));
function Published() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPublishedPosts(),
  });
  const navigate = useNavigate();
  if (error) {
    return (
      <div>
        <p>
          There are no published posts or you are not authorized. Try to publish
          something.
        </p>
        <button onClick={() => navigate("/")}>Back to Login</button>
      </div>
    );
  }
  if (isLoading) {
    return <div>Is Loading data....</div>;
  }
  return (
    <div className="bg-slate-900 text-white/75">
      {data.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
export default Published;
