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

export function ReportDetailsPage() {
  usePageTitle("Report Details");

  return (
    <section className="rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-8 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="pt-2 text-white/70">Submission Date &amp; Time</p>
          <p className="text-[1.1rem] leading-8">March 15, 2024 at 2:34 PM EST</p>
        </div>

        <div>
          <div>
            <p className="mb-3 text-white/70">Reporter</p>
            <Person
              name="Sarah Johnson"
              detail="sarah.johnson@email.com • Premium User"
              accent="linear-gradient(135deg, #f2d8b5 0%, #cf9db4 50%, #9ebde8 100%)"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/35 pt-6">
        <p className="text-white/70">Title</p>
        <h2 className="mt-2 text-[1.9rem] font-semibold">Harassment Through Direct Messages</h2>
        <p className="mt-6 text-white/70">Description</p>
        <div className="mt-4 rounded-[8px] bg-white px-4 py-4 text-[1rem] leading-8 text-[#2d4ca0]">
          This user has been sending inappropriate messages and harassing content through direct
          messages. The behavior started approximately one week ago and has escalated to threatening
          language. I have screenshots of the conversations as evidence. This is making me
          uncomfortable using the platform and I believe this violates the community guidelines
          regarding harassment and bullying.
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
