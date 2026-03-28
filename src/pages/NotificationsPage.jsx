import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { apiRequest } from "../lib/api";

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

function formatNotificationDate(value) {
  if (!value) {
    return "Unknown time";
  }

  return new Date(value).toLocaleString();
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  usePageTitle("Notifications");

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      try {
        const payload = await apiRequest("/notification/me");

        if (!isMounted) {
          return;
        }

        setNotifications(payload.data || []);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error.message || "Unable to load notifications");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadNotifications();

    return () => {
      isMounted = false;
    };
  }, []);

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
            {isLoading ? (
              <p className="px-2 text-white/75">Loading notifications...</p>
            ) : null}
            {!isLoading && errorMessage ? (
              <p className="px-2 text-[#ff8080]">{errorMessage}</p>
            ) : null}
            {!isLoading && !errorMessage && notifications.length === 0 ? (
              <p className="px-2 text-white/75">No notifications found.</p>
            ) : null}
            {!isLoading &&
              !errorMessage &&
              notifications.map((notification) => (
                <div key={notification._id} className="flex items-start gap-3">
                  <BellBadge />
                  <div className="pt-0.5 text-white">
                    <p className="text-[1.05rem] font-medium leading-6">
                      {notification.title}
                    </p>
                    <p className="mt-1 text-[0.98rem] text-white/70">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-white/50">
                      {formatNotificationDate(notification.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-12 flex justify-end pr-14 text-white">
            <span className="text-sm">{notifications.length}</span>
          </div>
        </div>
      </article>
    </section>
  );
}
