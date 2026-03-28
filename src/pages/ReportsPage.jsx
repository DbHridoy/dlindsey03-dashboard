import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

const reports = Array.from({ length: 11 }, () => ({
  id: "01",
  name: "Robert Fox",
  reason: "Unprofessional behavior",
  date: "02-24-2025",
}));

function Avatar() {
  return (
    <div className="grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-[#f0bb97] via-[#c4d3f4] to-[#86b8f2] text-[0.55rem] font-semibold text-slate-800">
      RF
    </div>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 7 4 12l5 5" />
      <path d="M20 12H4" />
      <path d="M20 17a5 5 0 0 0-5-5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function ReportsPage() {
  usePageTitle("Reports");

  return (
    <DashboardPanel title="Reports" contentClassName="px-4 py-4 sm:px-5 sm:py-4">
      <div className="overflow-x-auto">
          <div className="min-w-[820px]">
            <div className="grid grid-cols-[0.7fr_1.5fr_1.7fr_1fr_0.8fr] px-4 py-3 text-[0.95rem] text-[#1aded1]">
              <p>S.ID</p>
              <p>Report From</p>
              <p>Report Reason</p>
              <p>Date &amp; Time</p>
              <p className="text-center">Action</p>
            </div>
            {reports.map((report, index) => (
              <div
                key={`${report.date}-${index}`}
                className="grid grid-cols-[0.7fr_1.5fr_1.7fr_1fr_0.8fr] items-center border-t border-white/55 px-4 py-3 text-[0.95rem] text-white"
              >
                <p>{report.id}</p>
                <div className="flex items-center gap-3">
                  <Avatar />
                  <span>{report.name}</span>
                </div>
                <p>{report.reason}</p>
                <p>{report.date}</p>
                <div className="flex items-center justify-center gap-3">
                  <Link to="/resolve-report" className="text-[#12ddd0]" aria-label="Reply to report">
                    <ReturnIcon />
                  </Link>
                  <Link to="/report-details" className="text-[#10dccf]" aria-label="View report">
                    <EyeIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col gap-4 px-2 pb-2 text-[#12ddd0] md:flex-row md:items-center md:justify-between">
            <p className="text-[0.9rem]">SHOWING 1-8 OF 250</p>
            <div className="flex flex-wrap items-center gap-4 text-white/75">
              <button type="button" aria-label="Previous page">
                ‹
              </button>
              <div className="grid h-5 w-5 place-items-center rounded-[4px] bg-[#14d9ce] text-[0.75rem] text-white">
                1
              </div>
              <span>2</span>
              <span>3</span>
              <span>4.....30</span>
              <span>60</span>
              <span>120</span>
              <button type="button" aria-label="Next page">
                ›
              </button>
            </div>
          </div>
      </div>
    </DashboardPanel>
  );
}
