import { Link } from "react-router-dom";

export function DashboardPanel({
  title,
  backTo,
  action,
  contentClassName = "",
  children,
  headerClassName = "",
}) {
  return (
    <section className="rounded-[14px] bg-linear-to-br from-[#24438d] via-[#16556e] to-[#103433] p-px shadow-[0_6px_14px_rgba(15,24,28,0.22)]">
      <div className="min-h-[calc(100vh-112px)] overflow-hidden rounded-[14px] bg-linear-to-br from-[#25458a] via-[#18526f] to-[#103635]">
        <div
          className={[
            "flex min-h-[64px] items-center justify-between gap-4 bg-linear-to-r from-[#2ccfc8] to-[#12d7cc] px-4 py-3 sm:px-5",
            headerClassName,
          ].join(" ")}
        >
          <div className="flex items-center gap-4">
            {backTo ? (
              <Link
                to={backTo}
                className="text-3xl leading-none text-white"
                aria-label="Back"
              >
                ←
              </Link>
            ) : null}
            <h2 className="text-[1.8rem] font-semibold leading-none text-white sm:text-[2rem]">
              {title}
            </h2>
          </div>
          {action}
        </div>

        <div className={["px-4 py-4 sm:px-5 sm:py-5", contentClassName].join(" ")}>
          {children}
        </div>
      </div>
    </section>
  );
}
