import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { apiRequest } from "../lib/api";

export function ResolveReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [report, setReport] = useState(null);
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  usePageTitle("Resolution Details");

  const totalAttachmentSize = attachments.reduce((sum, file) => sum + file.size, 0);

  useEffect(() => {
    let isMounted = true;

    async function loadReport() {
      try {
        const payload = await apiRequest(`/support/${id}`);

        if (!isMounted) {
          return;
        }

        setReport(payload.data);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error.message || "Unable to load report");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      void loadReport();
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  function mergeAttachments(files) {
    if (!files.length) {
      return;
    }

    setAttachments((currentFiles) => {
      const existingFileKeys = new Set(
        currentFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
      );

      const nextFiles = [...currentFiles];

      files.forEach((file) => {
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

        if (!existingFileKeys.has(fileKey)) {
          existingFileKeys.add(fileKey);
          nextFiles.push(file);
        }
      });

      return nextFiles;
    });
  }

  function handleFileSelection(event) {
    mergeAttachments(Array.from(event.target.files || []));
    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDraggingFiles(false);
    mergeAttachments(Array.from(event.dataTransfer.files || []));
  }

  function removeAttachment(fileToRemove) {
    setAttachments((currentFiles) =>
      currentFiles.filter(
        (file) =>
          !(
            file.name === fileToRemove.name &&
            file.size === fileToRemove.size &&
            file.lastModified === fileToRemove.lastModified
          ),
      ),
    );
  }

  function clearAttachments() {
    setAttachments([]);
  }

  async function handleResolve() {
    if (!report?._id) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await apiRequest(`/support/${report._id}/status`, {
        method: "PATCH",
        body: {
          status: "resolved",
        },
      });

      navigate(`/reports/${report._id}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Unable to resolve report");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <section className="mx-auto max-w-4xl rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-6 sm:py-7">
        Loading resolution details...
      </section>
    );
  }

  if (errorMessage && !report) {
    return (
      <section className="mx-auto max-w-4xl rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-6 sm:py-7">
        <p className="text-[#ff8080]">{errorMessage}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-6 sm:py-7">
      <h1 className="text-[2rem] font-semibold">Resolution Details</h1>

      <div className="mt-6 grid gap-5">
        <label className="grid gap-3">
          <span className="text-lg font-medium">Resolution Notes</span>
          <textarea
            rows="5"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Describe the action taken to resolve this report..."
            className="w-full rounded-[8px] bg-white px-4 py-3 text-[1rem] text-[#2d4ca0] outline-none placeholder:text-[#2d4ca0]"
          />
        </label>

        <div className="grid gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-lg font-medium">Attach Supporting Documents</span>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-[6px] border border-white/45 px-3 py-1.5 text-white/85"
              >
                Browse Files
              </button>
              <button
                type="button"
                onClick={clearAttachments}
                disabled={attachments.length === 0}
                className="rounded-[6px] border border-white/20 px-3 py-1.5 text-white/55 disabled:opacity-40"
              >
                Clear All
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelection}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDraggingFiles(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDraggingFiles(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();

              if (event.currentTarget.contains(event.relatedTarget)) {
                return;
              }

              setIsDraggingFiles(false);
            }}
            onDrop={handleDrop}
            className={[
              "grid min-h-[128px] place-items-center rounded-[8px] border-2 border-dashed px-4 py-6 text-center transition",
              isDraggingFiles
                ? "border-[#35cac8] bg-[#dffbf8] text-[#1c4f88]"
                : "border-white/15 bg-white text-[#2d4ca0]",
            ].join(" ")}
          >
            <span className="grid justify-items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                <path d="M12 16a1 1 0 0 1-1-1V9.41l-1.3 1.3a1 1 0 1 1-1.4-1.42l3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1-1.4 1.42L13 9.4V15a1 1 0 0 1-1 1Z" />
                <path d="M5 19a3 3 0 0 1-3-3 4 4 0 0 1 4-4h1.26A5 5 0 0 1 17 10h.5a4.5 4.5 0 0 1 .87 8.91A1 1 0 1 1 18 17h.5a2.5 2.5 0 0 0 0-5H17a1 1 0 0 1-1-1 3 3 0 0 0-5.65-1.33 1 1 0 0 1-.9.53H6a2 2 0 0 0 0 4h1a1 1 0 1 1 0 2H5Z" />
              </svg>
              <span>{isDraggingFiles ? "Drop files to attach" : "Drop files here or click to browse"}</span>
              <span className="text-sm text-[#2d4ca0]/70">
                Add screenshots, exports, or supporting documents to this resolution draft.
              </span>
            </span>
          </button>
          {attachments.length > 0 ? (
            <div className="grid gap-3 rounded-[8px] border border-white/10 bg-white/5 p-4">
              <div className="flex flex-col gap-1 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
                <p>{attachments.length} file{attachments.length === 1 ? "" : "s"} selected</p>
                <p>{Math.ceil(totalAttachmentSize / 1024)} KB total</p>
              </div>
              <div className="grid gap-2">
                {attachments.map((file) => (
                  <div
                    key={`${file.name}-${file.size}-${file.lastModified}`}
                    className="flex flex-col gap-2 rounded-[8px] bg-[#173430] px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-white">{file.name}</p>
                      <p className="text-sm text-white/60">
                        {(file.type || "Unknown type")} • {Math.max(1, Math.ceil(file.size / 1024))} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file)}
                      className="rounded-[6px] border border-[#ff8080]/45 px-3 py-1.5 text-sm text-[#ff9b9b]"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/55">
              No attachments selected yet.
            </p>
          )}
        </div>

        <div className="rounded-[8px] border border-[#35cac8]/30 bg-[#123531] px-4 py-4 text-sm text-white/80">
          This action updates the report status to `resolved` in the backend.
          Resolution notes and attachments are currently local-only because the API does not store them yet.
        </div>

        {errorMessage ? (
          <p className="text-sm text-[#ff8080]">{errorMessage}</p>
        ) : null}

        <div className="grid gap-4 pt-4 sm:grid-cols-[1fr_auto]">
          <button
            type="button"
            onClick={handleResolve}
            disabled={isSubmitting}
            className="grid h-12 place-items-center rounded-[6px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] px-6 text-xl font-semibold text-white disabled:opacity-60"
          >
            {isSubmitting ? "Resolving..." : "✓ Resolve & Close Report"}
          </button>
          <Link
            to={report ? `/reports/${report._id}` : "/reports"}
            className="grid h-12 place-items-center rounded-[6px] border border-white/60 px-8 text-xl font-medium text-white"
          >
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
}
