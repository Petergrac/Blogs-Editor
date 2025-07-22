import { useQuery } from "@tanstack/react-query";
import { getAllDrafts } from "../api/api";
import Post from "./article";
import { Link } from "react-router-dom";
import Loading from "./loadingComponent";

function Drafts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["drafts"],
    queryFn: () => getAllDrafts(),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    const status = error?.response?.status;
    if (status === 401) {
      return (
        <div className="min-h-screen bg-slate-800">
          <p className="text-white/80">You are not authorized</p>
          <Link to="/login" className="p-2 bg-blue-400 rounded-md text-white">
            Go to login
          </Link>
        </div>
      );
    }
    if (status === 500) {
      return <p className="none">Internal server error</p>;
    }
    if (status === 404) {
      return (
        <p className="none">
          There are no drafts.
          <p>Make sure you registered as an author in Blog App.</p>
        </p>
      );
    }
  }
  if (!data || data.length === 0) {
    return (
      <div className="none flex-col">
        There are no drafts.
        <p>Make sure you registered as an author in Blog App</p>
      </div>
    );
  }
  return (
    <div className="bg-slate-900 text-white/75 min-h-[100vh]">
      {data.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default Drafts;
