import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { apiRequest } from "../lib/api";

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

function formatReportDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleString();
}

export function ReportDetailsPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  usePageTitle("Report Details");

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

  if (isLoading) {
    return (
      <section className="rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-8 sm:py-8">
        Loading report...
      </section>
    );
  }

  if (errorMessage || !report) {
    return (
      <section className="rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-8 sm:py-8">
        <p className="text-[#ff8080]">{errorMessage || "Report not found"}</p>
      </section>
    );
  }

  const reporterName = report.userId?.fullName || "Unknown User";
  const reporterDetail = report.userId?.email || "No email available";

  return (
    <section className="rounded-[12px] bg-[#102622] px-5 py-6 text-white shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-8 sm:py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <p className="pt-2 text-white/70">Submission Date &amp; Time</p>
          <p className="text-[1.1rem] leading-8">{formatReportDate(report.createdAt)}</p>
        </div>

        <div>
          <div>
            <p className="mb-3 text-white/70">Reporter</p>
            <Person
              name={reporterName}
              detail={`${reporterDetail} • ${report.status}`}
              accent="linear-gradient(135deg, #f2d8b5 0%, #cf9db4 50%, #9ebde8 100%)"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/35 pt-6">
        <p className="text-white/70">Title</p>
        <h2 className="mt-2 text-[1.9rem] font-semibold">{report.title}</h2>
        <p className="mt-6 text-white/70">Description</p>
        <div className="mt-4 rounded-[8px] bg-white px-4 py-4 text-[1rem] leading-8 text-[#2d4ca0]">
          {report.description}
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link
          to={`/reports/${report._id}/resolve`}
          className="grid h-11 min-w-[220px] place-items-center rounded-[6px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] px-6 text-lg font-semibold text-white"
        >
          Open Resolution
        </Link>
      </div>
    </section>
  );
}
