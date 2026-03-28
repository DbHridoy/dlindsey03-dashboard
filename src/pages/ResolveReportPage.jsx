import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

function CheckRow({ label }) {
  return (
    <label className="flex items-center gap-3 text-white/75">
      <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-transparent" />
      <span>{label}</span>
    </label>
  );
}

export function ResolveReportPage() {
  usePageTitle("Resolution Details");

  return (
    <section className="mx-auto max-w-4xl rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-6 sm:py-7">
      <h1 className="text-[2rem] font-semibold">Resolution Details</h1>

      <div className="mt-6 grid gap-5">
        <label className="grid gap-3">
          <span className="text-lg font-medium">Resolution Notes</span>
          <textarea
            rows="5"
            placeholder="Describe the action taken to resolve this report..."
            className="w-full rounded-[8px] bg-white px-4 py-3 text-[1rem] text-[#2d4ca0] outline-none placeholder:text-[#2d4ca0]"
          />
        </label>

        <div className="grid gap-3">
          <span className="text-lg font-medium">Attach Supporting Documents (Optional)</span>
          <button
            type="button"
            className="grid min-h-[128px] place-items-center rounded-[8px] bg-white px-4 py-6 text-[#2d4ca0]"
          >
            <span className="grid justify-items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                <path d="M12 16a1 1 0 0 1-1-1V9.41l-1.3 1.3a1 1 0 1 1-1.4-1.42l3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1-1.4 1.42L13 9.4V15a1 1 0 0 1-1 1Z" />
                <path d="M5 19a3 3 0 0 1-3-3 4 4 0 0 1 4-4h1.26A5 5 0 0 1 17 10h.5a4.5 4.5 0 0 1 .87 8.91A1 1 0 1 1 18 17h.5a2.5 2.5 0 0 0 0-5H17a1 1 0 0 1-1-1 3 3 0 0 0-5.65-1.33 1 1 0 0 1-.9.53H6a2 2 0 0 0 0 4h1a1 1 0 1 1 0 2H5Z" />
              </svg>
              <span>Drop files here or click to browse</span>
            </span>
          </button>
        </div>

        <div className="grid gap-3 pt-1">
          <CheckRow label="Notify Reporter by Email" />
        </div>

        <div className="grid gap-4 pt-4 sm:grid-cols-[1fr_auto]">
          <Link
            to="/reports"
            className="grid h-12 place-items-center rounded-[6px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] px-6 text-xl font-semibold text-white"
          >
            ✓ Resolve &amp; Close Report
          </Link>
          <Link
            to="/report-details"
            className="grid h-12 place-items-center rounded-[6px] border border-white/60 px-8 text-xl font-medium text-white"
          >
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
}
