import { useRef, useState } from "react";
import { handleNewPost } from "../logic/articleLogic";
import EditorComponent from "./editorComponent";

function PostEditor() {
  const editorRef = useRef(null);
  const [status, setStatus] = useState("DRAFT");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    await handleNewPost(editorRef, title, status);
  };

  return (
    <EditorComponent
      props={{ editorRef, title, status, setStatus, setTitle, handleSubmit }}
    />
  );
}

export default PostEditor;
