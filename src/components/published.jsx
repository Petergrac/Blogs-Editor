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
  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    const status = error?.response?.status;
    if (status === 401) {
      return navigate("/");
    }
    if (status === 500) {
      return <p>Internal server error</p>;
    }
    if (status === 404) {
      return <p>There are no posts</p>;
    }
  }
  if (!data || data.length === 0) {
    return <div>There are no posts</div>;
  }
  return (
    <div className="bg-slate-900 text-white/75 min-h-[80vh]">
      {data.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
export default Published;
