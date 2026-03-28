import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

const items = [
  { label: "Change Password", path: "/change-password" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms-conditions" },
  { label: "About Us", path: "/about-us" },
];

export function SettingsPage() {
  usePageTitle("Settings");

  return (
    <DashboardPanel title="Settings" contentClassName="px-5 py-2">
      <div>
          {items.map((item) => (
            <Link
              key={`${item.label}-${item.path}`}
              to={item.path}
              className="flex items-center justify-between border-b border-white/40 py-4 text-[1.15rem] text-white transition hover:text-[#14ddd0]"
            >
              <span>{item.label}</span>
              <span className="text-[1.55rem] leading-none">›</span>
            </Link>
          ))}
      </div>
    </DashboardPanel>
  );
}
