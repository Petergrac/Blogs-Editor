import { useQuery } from "@tanstack/react-query";
import { getAllDrafts } from "../api/api";
import Post from "./article";

function Drafts() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["drafts"],
    queryFn: () => getAllDrafts(),
  });
  if (error) {
    return <div>You don't have drafts or you don't have access to this page.</div>;
  }
  if(isLoading){
    return <div>Data is being loaded</div>
  }
  return (
    <div className="bg-slate-900 text-white/75 min-h-[100vh]">
      <div></div>
      {data.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}

export default Drafts;
