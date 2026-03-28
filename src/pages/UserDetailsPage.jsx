import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

function UserDetailsCard({ actionLabel = "Block", actionTo = "/confirm-block-user" }) {
  const details = [
    ["Name", "John Doe."],
    ["Email", "john@email.com"],
    ["Phone", "+12313412"],
    ["Joining Date", "02-24-2024"],
    ["User Type", "Clients"],
  ];

  return (
    <section className="w-full max-w-3xl rounded-[14px] bg-[#222d42] px-6 py-8 shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-10 sm:py-12">
      <div className="text-center">
        <h1 className="text-[2.25rem] font-semibold text-[#19ddd1] sm:text-[2.7rem]">User Details</h1>
        <p className="mt-3 text-lg text-white/70 sm:text-[1.05rem]">See all details about John Doe</p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-linear-to-br from-[#e9d6ae] via-[#7fb6e9] to-[#4f83c7] text-sm font-semibold text-slate-900">
          JD
        </div>
        <h2 className="text-[2rem] font-medium text-[#19ddd1]">John Doe</h2>
      </div>

      <div className="mt-8 grid gap-6">
        {details.map(([label, value]) => (
          <div key={label} className="grid grid-cols-1 gap-2 text-white sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="text-[1.15rem] font-semibold sm:text-[1.2rem]">{label}</p>
            <p className="text-[1.1rem] text-white/95 sm:text-right sm:text-[1.15rem]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          to="/user"
          className="grid h-12 place-items-center rounded-[4px] border border-[#18ddd1] text-xl font-semibold text-[#18ddd1]"
        >
          Cancel
        </Link>
        <Link
          to={actionTo}
          className="grid h-12 place-items-center rounded-[4px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] text-xl font-semibold text-white"
        >
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}

export function UserDetailsPage() {
  usePageTitle("User Details");

  return (
    <div className="grid min-h-[calc(100vh-110px)] place-items-center rounded-[14px] bg-transparent p-4">
      <UserDetailsCard />
    </div>
  );
}

export { UserDetailsCard };
