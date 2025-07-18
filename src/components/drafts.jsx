import { useQuery } from "@tanstack/react-query";
import { getAllDrafts } from "../api/api";
import Post from "./article";
import { useNavigate } from "react-router-dom";

function Drafts() {
  const navigate = useNavigate();
  const { data, error, isLoading } = useQuery({
    queryKey: ["drafts"],
    queryFn: () => getAllDrafts(),
  });
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
      return <p>There are no drafts</p>;
    }
  }
  if (!data || data.length === 0) {
    return <div>There are no drafts</div>;
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
