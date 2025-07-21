import { useRef, useState } from "react";
import Loading from "./loadingComponent";
import { useNavigate } from "react-router-dom";
import { handleNewPost } from "../logic/articleLogic";
import EditorComponent from "./editorComponent";

import { useMutation } from "@tanstack/react-query";

function PostEditor() {
  const editorRef = useRef(null);
  const [status, setStatus] = useState("DRAFT");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => handleNewPost(editorRef, title, status),
    onSuccess: () => {
      alert("Post created!");
      navigate("/home/published");
    },
  });

  const handleSubmit = () => {
    ("Handle submit called");
    mutate();
  };

  if (isPending) return <Loading />;

  if (error) {
    const status = error?.response?.status;
    if (status === 401) {
      return navigate("/");
    }
    if (status === 500) {
      return <p className="none">Internal server error</p>;
    }
    if (status === 404) {
      return <p className="none">There are no drafts</p>;
    }
    return <p className="none">Unexpected error</p>;
  }

  return (
    <EditorComponent
      props={{ editorRef, title, status, setStatus, setTitle, handleSubmit }}
    />
  );
}

export default PostEditor;
