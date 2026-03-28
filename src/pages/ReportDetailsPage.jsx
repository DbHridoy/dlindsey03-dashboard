import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

function Person({ name, detail, accent }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold text-slate-900"
        style={{ background: accent }}
      >
        {name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div>
        <p className="text-[1.05rem] font-medium text-white">{name}</p>
        <p className="text-sm text-white/55">{detail}</p>
      </div>
    </div>
  );
}

function Attachment({ label }) {
  return (
    <div className="w-[74px]">
      <div className="grid h-[68px] w-[68px] place-items-center rounded-[6px] bg-white text-[#2d4ca0]">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-1 13H6l3.5-4.5 2.5 3 1.5-2 4.5 5.5ZM8 9.5A1.5 1.5 0 1 1 9.5 11 1.5 1.5 0 0 1 8 9.5Z" />
        </svg>
      </div>
      <p className="mt-2 text-[0.72rem] text-white/50">{label}</p>
    </div>
  );
}

export function ReportDetailsPage() {
  usePageTitle("Report Details");

  return (
    <section className="rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-8 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="text-white/70">Report ID</p>
          <p className="text-[2rem] font-semibold leading-tight">#RPT-2024-001</p>
          <p className="text-[2rem] font-semibold leading-none">247</p>
          <p className="pt-2 text-white/70">Submission Date &amp; Time</p>
          <p className="text-[1.1rem] leading-8">March 15, 2024 at 2:34 PM EST</p>
          <p className="pt-1 text-white/70">Category</p>
          <div className="inline-flex items-center rounded-full bg-[#37292a] px-3 py-1 text-sm text-[#ff575e]">
            ⚠ Abuse Report
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-3 text-white/70">Reporter</p>
            <Person
              name="Sarah Johnson"
              detail="sarah.johnson@email.com • Premium User"
              accent="linear-gradient(135deg, #f2d8b5 0%, #cf9db4 50%, #9ebde8 100%)"
            />
          </div>
          <div>
            <p className="mb-3 text-white/70">Reported User</p>
            <Person
              name="Mike Peterson"
              detail="ID: #USR-89472 • Standard User"
              accent="linear-gradient(135deg, #d9d2aa 0%, #7a7a5f 55%, #d2c8a0 100%)"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/35 pt-6">
        <h2 className="text-[1.9rem] font-semibold">Report Description</h2>
        <div className="mt-4 rounded-[8px] bg-white px-4 py-4 text-[1rem] leading-8 text-[#2d4ca0]">
          This user has been sending inappropriate messages and harassing content through direct
          messages. The behavior started approximately one week ago and has escalated to threatening
          language. I have screenshots of the conversations as evidence. This is making me
          uncomfortable using the platform and I believe this violates the community guidelines
          regarding harassment and bullying.
        </div>

        <div className="mt-6">
          <p className="text-lg font-medium">Attachments (3)</p>
          <div className="mt-3 flex flex-wrap gap-5">
            <Attachment label="screenshot1.png" />
            <Attachment label="screenshot2.png" />
            <Attachment label="conversation.png" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link
          to="/resolve-report"
          className="grid h-11 min-w-[220px] place-items-center rounded-[6px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] px-6 text-lg font-semibold text-white"
        >
          Open Resolution
        </Link>
      </div>
    </section>
  );
}
