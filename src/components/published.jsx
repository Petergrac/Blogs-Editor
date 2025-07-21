import { useQuery } from "@tanstack/react-query";
import { getPublishedPosts } from "../api/api";
import { useNavigate } from "react-router-dom";
import { lazy } from "react";
import Loading from "./loadingComponent";
const Post = lazy(() => import("../components/article"));
function Published() {

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPublishedPosts(),
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    const status = error?.response?.status;
    if (status === 401) {
      return navigate("/");
    }
    if (status === 500) {
      return <p className="none">Internal server error</p>;
    }
    if (status === 404) {
      return (
        <p className="none flex-col">
          There are no posts.
          <p>Make sure you registered as an author in Blog App</p>
        </p>
      );
    }
  }
  if (!data || data.length === 0) {
    return (
      <div className="none flex-col">
        There are no posts
        <p>Make sure you registered as an author in blog app.</p>
      </div>
    );
  }
  return (
    <div className="bg-slate-900 text-white/75 min-h-[80vh] p-4">
      {data.map((post) => (
        <div key={post.id} >
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
export default Published;
