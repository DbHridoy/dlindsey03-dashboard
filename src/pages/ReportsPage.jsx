import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";
import { apiRequest } from "../lib/api";

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-[#f0bb97] via-[#c4d3f4] to-[#86b8f2] text-[0.55rem] font-semibold text-slate-800">
      {initials}
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

function formatReportDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleString();
}

function getReporter(report) {
  return report.userId?.fullName || "Unknown User";
}

export function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  usePageTitle("Reports");

  useEffect(() => {
    let isMounted = true;

    async function loadReports() {
      try {
        const payload = await apiRequest("/support");

        if (!isMounted) {
          return;
        }

        setReports(payload.data || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error.message || "Unable to load reports");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadReports();

    return () => {
      isMounted = false;
    };
  }, []);

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
          {isLoading ? (
            <div className="border-t border-white/55 px-4 py-8 text-center text-white">
              Loading reports...
            </div>
          ) : null}
          {!isLoading && errorMessage ? (
            <div className="border-t border-white/55 px-4 py-8 text-center text-[#ff8080]">
              {errorMessage}
            </div>
          ) : null}
          {!isLoading && !errorMessage && reports.length === 0 ? (
            <div className="border-t border-white/55 px-4 py-8 text-center text-white">
              No reports found.
            </div>
          ) : null}
          {!isLoading &&
            !errorMessage &&
            reports.map((report, index) => (
              <div
                key={report._id}
                className="grid grid-cols-[0.7fr_1.5fr_1.7fr_1fr_0.8fr] items-center border-t border-white/55 px-4 py-3 text-[0.95rem] text-white"
              >
                <p>{String(index + 1).padStart(2, "0")}</p>
                <div className="flex items-center gap-3">
                  <Avatar name={getReporter(report)} />
                  <span>{getReporter(report)}</span>
                </div>
                <p>{report.title}</p>
                <p>{formatReportDate(report.createdAt)}</p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    to={`/reports/${report._id}/resolve`}
                    className="text-[#12ddd0]"
                    aria-label="Resolve report"
                  >
                    <ReturnIcon />
                  </Link>
                  <Link
                    to={`/reports/${report._id}`}
                    className="text-[#10dccf]"
                    aria-label="View report"
                  >
                    <EyeIcon />
                  </Link>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 px-2 pb-2 text-[#12ddd0] md:flex-row md:items-center md:justify-between">
          <p className="text-[0.9rem]">SHOWING {reports.length} OF {reports.length}</p>
        </div>
      </div>
    </DashboardPanel>
  );
}
