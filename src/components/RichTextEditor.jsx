import { useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function RichTextEditor({ value, onChange, name = "body" }) {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
      ],
    }),
    [],
  );

  const formats = useMemo(
    () => ["header", "bold", "italic", "underline", "list", "bullet", "link"],
    [],
  );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[10px] border border-white/35 bg-white text-slate-900">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          className="[&_.ql-container]:min-h-[320px] [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[320px] [&_.ql-editor]:text-base [&_.ql-editor]:leading-8 [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0"
        />
      </div>

      <textarea
        readOnly
        value={value}
        name={name}
        className="min-h-[140px] w-full rounded-[10px] border border-white/25 bg-[#15202f] px-4 py-3 font-mono text-sm text-white/80 outline-none"
      />
    </div>
  );
}
