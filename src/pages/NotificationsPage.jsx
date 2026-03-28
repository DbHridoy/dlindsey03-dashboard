import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

const notifications = [
  "Profile report!",
  "A new Verification request!",
  "Profile report!",
  "Profile report!",
  "A new user join in your app.",
  "A new user join in your app.",
  "A new user join in your app.",
  "A new user join in your app.",
  "A new user join in your app.",
];

function BellBadge() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-[4px] bg-white text-[#19d4c8] shadow-sm">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M15 18H9" />
        <path d="M18 16H6l1.4-1.6a2 2 0 0 0 .5-1.32V10a4.1 4.1 0 1 1 8.2 0v3.08c0 .48.18.94.5 1.3L18 16Z" />
        <path d="M10.5 18a1.5 1.5 0 0 0 3 0" />
      </svg>
    </span>
  );
}

export function NotificationsPage() {
  usePageTitle("Notifications");

  return (
    <section>
      <article className="min-h-[670px] overflow-hidden rounded-[14px] bg-linear-to-br from-[#23428b] via-[#15546c] to-[#114744] shadow-[0_10px_24px_rgba(8,35,35,0.18)]">
        <div className="flex items-center gap-3 bg-linear-to-r from-[#3cd0cc] to-[#13d9cd] px-4 py-4 text-[#24428d]">
          <Link
            to="/dashboard"
            className="text-4xl leading-none transition hover:opacity-80"
            aria-label="Back to dashboard"
          >
            ‹
          </Link>
          <h2 className="text-[2rem] font-semibold">All Notifications</h2>
        </div>

        <div className="px-3 py-5 md:px-4">
          <div className="space-y-8">
            {notifications.map((message, index) => (
              <div key={`${message}-${index}`} className="flex items-start gap-3">
                <BellBadge />
                <div className="pt-0.5 text-white">
                  <p className="text-[1.05rem] font-medium leading-6">{message}</p>
                  <p className="mt-1 text-[0.95rem] text-white/50">Fri, 12:30pm</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-end pr-14 text-white">
            <span className="text-sm">1</span>
          </div>
        </div>
      </article>
    </section>
  );
}
