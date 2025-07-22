import { Editor } from "@tinymce/tinymce-react";
import { handleUpdate } from "../logic/articleLogic";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function EditorComponent({ props }) {
  const {
    editorRef,
    title,
    content,
    status,
    setStatus,
    setTitle,
    handleSubmit,
    warning,
    id,
    setWarning,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: 760 });
  const navigate = useNavigate();
  const handlePostUpdate = async () => {
    const isTitleEmpty = title.trim();
    console.log(title);
    if (isTitleEmpty === "") {
      alert("Title cannot be empty");
    } else {
      const submitted = await handleUpdate(editorRef, title, status, id);
      if (submitted) {
        navigate("/");
      } else {
        alert("Post could not be saved");
      }
    }
  };

  return (
    <div className="p-4 space-y-4 bg-slate-900 min-h-[90vh]">
      <input
        type="text"
        placeholder="Post Title"
        className="border p-2 w-full text-white/55 rounded-md"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setWarning("hidden");
        }}
      />
      <p className={`text-red-400 ${warning}`}>Title Cannot be empty</p>
      <Editor
        className="bg-blue-400"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={content ? content : ""}
        apiKey="fmhf21sdb59k3igoszfn9wdv90k6p9nxxpa3j8ggyouhg965"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "textcolor",
            "colorpicker",
            "image",
            "link",
            "code",
            "codesample",
            "imagetools",
            "lists",
          ],
          toolbar:
            "undo redo | formatselect| forecolor backcolor | codesample |bold italic | alignleft aligncenter alignright | link image | code | bullist numlist outdent indent",
          branding: false,
        }}
      />
      <div
        className={
          isMobile ? "flex flex-col items-center justify-center gap-2" : ""
        }
      >
        <button
          onClick={id ? handlePostUpdate : handleSubmit}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Save Post
        </button>
        <select
          className={
            isMobile
              ? "border p-2 w-1/2 text-white/55 rounded-md"
              : "w-1/4 ml-2 border p-2  text-white/55 rounded-md"
          }
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
        <NavLink className="bg-blue-400 px-4 py-1 mx-4 rounded-md" to="/">
          Back to homepage
        </NavLink>
      </div>
    </div>
  );
}
export default EditorComponent;
