import { Link } from "react-router-dom";

const previewRows = [
  {
    id: "01",
    name: "Robert Fox",
    email: "fox@email",
    joined: "02-24-2024",
    accent: "#e8bf9e",
    status: "active",
  },
  {
    id: "02",
    name: "Jenny Wilson",
    email: "jenny@email",
    joined: "03-18-2024",
    accent: "#a7d0ff",
    status: "blocked",
  },
  {
    id: "03",
    name: "Cody Fisher",
    email: "cody@email",
    joined: "04-02-2024",
    accent: "#f2b8c6",
    status: "active",
  },
  {
    id: "04",
    name: "Savannah Nguyen",
    email: "savannah@email",
    joined: "04-21-2024",
    accent: "#9cd8d1",
    status: "active",
  },
];

export function DashboardUserList() {
  return (
    <section>
      <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-[1.45rem] font-medium text-black">User List</h2>
        <Link
          to="/user"
          className="inline-flex h-9 items-center justify-center rounded-[4px] bg-[#22d3c8] px-4 text-[0.84rem] font-medium text-white shadow-sm"
        >
          See All
        </Link>
      </div>

      <article className="overflow-x-auto rounded-[6px] bg-white shadow-[0_8px_18px_rgba(8,35,35,0.12)]">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[0.55fr_1.55fr_1.2fr_0.95fr_0.65fr] bg-linear-to-r from-[#1dcfc7] to-[#23d8ca] px-4 py-2.5 text-[0.78rem] font-medium text-[#1f4874]">
            <p>S.ID</p>
            <p>Full Name</p>
            <p>Email</p>
            <p>Joined Date</p>
            <p className="text-center">Action</p>
          </div>

          <div className="bg-linear-to-r from-[#254587] to-[#125c5d] text-white">
            {previewRows.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[0.55fr_1.55fr_1.2fr_0.95fr_0.65fr] items-center border-b border-white/35 px-4 py-2.5 text-[0.78rem] transition hover:bg-white/6"
              >
                <p>{user.id}</p>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full text-[0.62rem] font-semibold text-slate-900"
                    style={{ backgroundColor: user.accent }}
                  >
                    {user.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate">{user.name}</p>
                    <p className="text-[0.66rem] capitalize text-white/60">{user.status}</p>
                  </div>
                </div>
                <p className="truncate">{user.email}</p>
                <p>{user.joined}</p>
                <div className="flex items-center justify-center gap-3 text-base">
                  <Link
                    to={user.status === "blocked" ? "/blocked-user-details" : "/confirm-block-user"}
                    className="text-[#ff5a52]"
                    aria-label={user.status === "blocked" ? "Blocked user" : "Block user"}
                  >
                    ⊘
                  </Link>
                  <Link to="/user-details" className="text-[#12e1d4]" aria-label="View user">
                    ◉
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
