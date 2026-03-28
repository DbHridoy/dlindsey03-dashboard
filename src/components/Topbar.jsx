import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M15 18H9" />
      <path d="M18 16H6l1.4-1.6a2 2 0 0 0 .5-1.32V10a4.1 4.1 0 1 1 8.2 0v3.08c0 .48.18.94.5 1.3L18 16Z" />
      <path d="M10.5 18a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function Topbar() {
  useSelector((state) => state.layout.title);

  return (
    <header className="fixed left-3 right-3 top-3 z-10 md:left-[266px] md:right-4 md:top-4">
      <div className="flex min-h-[58px] items-center justify-between rounded-[8px] bg-linear-to-r from-[#23428c] via-[#16546e] to-[#0c2c2d] px-4 text-white shadow-[0_8px_16px_rgba(15,24,28,0.18)]">
        <div className="flex items-center gap-4">
          <button type="button" className="text-[#16d2c7]" aria-label="Toggle menu">
            <MenuIcon />
          </button>
          <div className="leading-tight">
            <h1 className="text-[0.95rem] font-semibold text-white">
              Welcome,James
            </h1>
            <p className="mt-1 text-[0.83rem] text-white/80">
              Have a nice day!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/notifications"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-[#16d2c7] text-[#16d2c7]"
            aria-label="Notifications"
          >
            <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full bg-red-500 text-center text-[0.55rem] leading-[14px] text-white">
              1
            </span>
            <BellIcon />
          </Link>
          <Link
            to="/profile"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#16d2c7] text-[#16d2c7]"
            aria-label="Profile"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
