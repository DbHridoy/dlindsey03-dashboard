import { useEffect, useState } from "react";
import { DashboardPanel } from "./DashboardPanel";
import { RichTextEditor } from "./RichTextEditor";
import { apiRequest } from "../lib/api";

const EMPTY_HTML = "<p></p>";

export function SettingsHtmlEditorPage({
  title,
  contentKey,
  backTo = "/setting",
}) {
  const [bodyHtml, setBodyHtml] = useState("");
  const [contentRecord, setContentRecord] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      setIsLoading(true);
      setErrorMessage("");
      setSaveMessage("");

      try {
        const payload = await apiRequest("/common");

        if (!isMounted) {
          return;
        }

        const record = payload.data || {};
        setContentRecord(record);
        setBodyHtml(record[contentKey] || "");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error.message || "Unable to load content");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      isMounted = false;
    };
  }, [contentKey]);

  async function handleSave() {
    setSaveMessage("");
    setErrorMessage("");
    setIsSaving(true);

    try {
      const hasExistingRecord = Boolean(contentRecord?._id);
      const payload = await apiRequest("/common", {
        method: hasExistingRecord ? "PATCH" : "POST",
        body: hasExistingRecord
          ? {
              [contentKey]: bodyHtml || EMPTY_HTML,
            }
          : {
              aboutUs: contentKey === "aboutUs"
                ? bodyHtml || EMPTY_HTML
                : contentRecord?.aboutUs || EMPTY_HTML,
              termsAndCondition: contentKey === "termsAndCondition"
                ? bodyHtml || EMPTY_HTML
                : contentRecord?.termsAndCondition || EMPTY_HTML,
              privacyPolicy: contentKey === "privacyPolicy"
                ? bodyHtml || EMPTY_HTML
                : contentRecord?.privacyPolicy || EMPTY_HTML,
            },
      });

      setContentRecord(payload.data);
      setBodyHtml(payload.data?.[contentKey] || "");
      setSaveMessage(payload.message || "Content saved successfully");
    } catch (error) {
      setErrorMessage(error.message || "Unable to save content");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <DashboardPanel
      title={title}
      backTo={backTo}
      action={
        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading || isSaving}
          className="h-8 rounded-[4px] bg-white px-6 text-sm font-semibold text-[#17b7bb]"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      }
      contentClassName="px-4 py-5 text-[1rem] text-white/80 sm:px-6"
    >
      <div className="space-y-4">
        {isLoading ? (
          <div className="py-10 text-center text-white/80">Loading content...</div>
        ) : (
          <RichTextEditor value={bodyHtml} onChange={setBodyHtml} />
        )}
        {saveMessage ? (
          <p className="text-sm font-medium text-[#c6fffb]">{saveMessage}</p>
        ) : null}
        {errorMessage ? (
          <p className="text-sm font-medium text-[#ff4e4e]">{errorMessage}</p>
        ) : null}
      </div>
    </DashboardPanel>
  );
}
