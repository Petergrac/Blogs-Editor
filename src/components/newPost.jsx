import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import api from "../api/api";

function PostEditor() {
  const editorRef = useRef(null);
  const [cstate, setCstate] = useState("DRAFT");
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(cstate)
      try {
        await api.post("http://localhost:3000/api/posts", {
          title,
          content,
          status: cstate,
        });
        alert("Post saved!");
      } catch (error) {
        console.error("Error saving post:", error);
        alert("Failed to save post.");
      }
    }
  };

  return (
    <div className="p-4 space-y-4 bg-slate-900 min-h-[80vh]">
      <input
        type="text"
        placeholder="Post Title"
        className="border p-2 w-full text-white/55 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Editor
        className="bg-blue-400"
        onInit={(evt, editor) => (editorRef.current = editor)}
        apiKey="fmhf21sdb59k3igoszfn9wdv90k6p9nxxpa3j8ggyouhg965"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Save Post
      </button>
      <select
        className="border p-2 w-1/4 ml-2 text-white/55 rounded-md"
        name="status"
        id="status"
        value={cstate} // controlled input
        onChange={(e) => setCstate(e.target.value)}
      >
        <option value="PUBLISHED">Published</option>
        <option default value="DRAFT">Draft</option>
      </select>
    </div>
  );
}

export default PostEditor;
