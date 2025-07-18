import { Editor } from "@tinymce/tinymce-react";
import { handleUpdate } from "../logic/articleLogic";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditorComponent({ props }) {
  const {
    editorRef,
    title,
    content,
    status,
    setStatus,
    setTitle,
    handleSubmit,
    id,
  } = props;
  const navigate = useNavigate()
  const handlePostUpdate = async () => {
    const submitted = await handleUpdate(editorRef, title, status, id);
    if(submitted){
        navigate('/home/published')
    }
    else{
        alert('Post could not be saved')
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
        initialValue={content ? content : ""}
        apiKey="fmhf21sdb59k3igoszfn9wdv90k6p9nxxpa3j8ggyouhg965"
        init={{
          height: 500,
          menubar: false,
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
      />

      <button
        onClick={id ? handlePostUpdate : handleSubmit}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Save Post
      </button>
      <select
        className="border p-2 w-1/4 ml-2 text-white/55 rounded-md"
        name="status"
        id="status"
        value={status} // controlled input
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="PUBLISHED">Published</option>
        <option default value="DRAFT">
          Draft
        </option>
      </select>
      <NavLink to="/home/published">Back to homepage</NavLink>
    </div>
  );
}
export default EditorComponent;
