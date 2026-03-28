import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleDateString();
}

export function DashboardUserList({ users, isLoading, error }) {
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
            {isLoading ? (
              <div className="px-4 py-8 text-center text-sm text-white/80">
                Loading users...
              </div>
            ) : null}
            {!isLoading && error ? (
              <div className="px-4 py-8 text-center text-sm text-white/80">
                {error}
              </div>
            ) : null}
            {!isLoading && !error && users.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-white/80">
                No users found.
              </div>
            ) : null}
            {!isLoading && !error && users.map((user, index) => (
              <div
                key={user._id}
                className="grid grid-cols-[0.55fr_1.55fr_1.2fr_0.95fr_0.65fr] items-center border-b border-white/35 px-4 py-2.5 text-[0.78rem] transition hover:bg-white/6"
              >
                <p>{String(index + 1).padStart(2, "0")}</p>
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full text-[0.62rem] font-semibold text-slate-900"
                    style={{ backgroundColor: user.isBlocked ? "#f2b8c6" : "#a7d0ff" }}
                  >
                    {user.fullName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate">{user.fullName}</p>
                    <p className="text-[0.66rem] capitalize text-white/60">
                      {user.isBlocked ? "blocked" : user.role}
                    </p>
                  </div>
                </div>
                <p className="truncate">{user.email}</p>
                <p>{formatDate(user.createdAt)}</p>
                <div className="flex items-center justify-center gap-3 text-base">
                  <Link
                    to="/user"
                    className="text-[#ff5a52]"
                    aria-label={user.isBlocked ? "Blocked user" : "Manage user"}
                  >
                    ⊘
                  </Link>
                  <Link to="/user" className="text-[#12e1d4]" aria-label="View user">
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
