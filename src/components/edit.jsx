import { useRef, useState } from "react";
import EditorComponent from "./editorComponent";

function EditComponent({ data }) {
  const editorRef = useRef(null);
  const [status, setStatus] = useState(data.status);
  const [content] = useState(data.content);
  const [title, setTitle] = useState(data.title);

  return (
    <div className="bg-slate-800 min-h-[90vh]">
      <EditorComponent
        props={{ editorRef, title, setTitle, status, setStatus, content, id: data.id }}
      />
    </div>
  );
}
export default EditComponent;
