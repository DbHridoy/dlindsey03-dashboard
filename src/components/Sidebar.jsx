import { NavLink } from "react-router-dom";
import sidebarLogo from "../assets/sidebar-logo.svg";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Users", path: "/user" },
  { label: "Reports", path: "/reports" },
  { label: "Create Admin", path: "/create-admin" },
  { label: "Settings", path: "/setting" },
];

export function Sidebar({ onLogoutClick }) {
  return (
    <aside className="fixed left-4 top-4 z-20 hidden h-[calc(100vh-2rem)] w-[238px] rounded-[12px] bg-linear-to-b from-[#24438d] via-[#16576c] to-[#0f2322] px-5 py-12 text-white shadow-[0_4px_16px_rgba(7,18,22,0.25)] md:flex md:flex-col">
      <div className="mb-10 px-1 pt-1">
        <img
          src={sidebarLogo}
          alt="VaultLife"
          className="h-auto w-full"
        />
      </div>

      <nav className="grid gap-3 pt-5">
        {navItems.map((item) => (
          <NavLink
            key={`${item.label}-${item.path}`}
            to={item.path}
            className={({ isActive }) =>
              [
                "rounded-[4px] px-4 py-3 text-[0.95rem] font-medium text-white transition hover:bg-white/12",
                isActive
                  ? "bg-white text-[#27408b] shadow-sm"
                  : "",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogoutClick}
        className="mt-auto flex items-center gap-3 px-4 py-3 text-left text-[0.95rem] font-medium text-[#ff4d4d]"
      >
        <span className="text-xl">↩</span>
        Logout
      </button>
    </aside>
  );
}
