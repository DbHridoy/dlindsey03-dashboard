import { useState } from "react";
import { DashboardPanel } from "./DashboardPanel";
import { RichTextEditor } from "./RichTextEditor";

export function SettingsHtmlEditorPage({
  title,
  initialHtml,
  backTo = "/setting",
}) {
  const [bodyHtml, setBodyHtml] = useState(initialHtml);
  const [saveMessage, setSaveMessage] = useState("");

  function handleSave() {
    setSaveMessage("HTML body is ready to submit to the backend.");
  }

  return (
    <DashboardPanel
      title={title}
      backTo={backTo}
      action={
        <button
          type="button"
          onClick={handleSave}
          className="h-8 rounded-[4px] bg-white px-6 text-sm font-semibold text-[#17b7bb]"
        >
          Save
        </button>
      }
      contentClassName="px-4 py-5 text-[1rem] text-white/80 sm:px-6"
    >
      <div className="space-y-4">
        <RichTextEditor value={bodyHtml} onChange={setBodyHtml} />
        {saveMessage ? (
          <p className="text-sm font-medium text-[#c6fffb]">{saveMessage}</p>
        ) : null}
      </div>
    </DashboardPanel>
  );
}
