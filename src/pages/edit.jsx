import { lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { handlePostById } from "../logic/articleLogic";
import Loading from "../components/loadingComponent";
const EditComponent = lazy(() => import("../components/edit"));
function EditPost() {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["postBId"],
    queryFn: () => handlePostById(id),
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    error;
    switch (error) {
      case 404:
        return <p>Post Not Found</p>;
      case 401:
        return <p>You are not authorized to access the post</p>;
      case 500:
        return <p>Internal server error</p>;
      default:
        return <p>Could not load the post due to unexpected reason</p>;
    }
  }
  return (
    <div>
      <div className="text-center font-bold bg-zinc-800 py-4 text-lg text-white/75 md:text-4xl">
        Edit Post
      </div>
      <EditComponent data={data} />
    </div>
  );
}

export default EditPost;
