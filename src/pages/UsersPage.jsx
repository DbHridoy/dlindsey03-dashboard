import { useEffect, useMemo, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

const initialUsers = [
  {
    id: "01",
    name: "Robert Fox",
    email: "fox@email.com",
    phone: "+1 222 333 4444",
    joiningDate: "02-24-2024",
    userType: "Clients",
    isBlocked: false,
  },
  {
    id: "02",
    name: "Jenny Wilson",
    email: "jenny@email.com",
    phone: "+1 444 333 1234",
    joiningDate: "02-12-2024",
    userType: "Clients",
    isBlocked: true,
  },
  {
    id: "03",
    name: "Wade Warren",
    email: "wade@email.com",
    phone: "+1 333 221 6543",
    joiningDate: "01-29-2024",
    userType: "Clients",
    isBlocked: false,
  },
  {
    id: "04",
    name: "Jacob Jones",
    email: "jacob@email.com",
    phone: "+1 555 222 1111",
    joiningDate: "01-16-2024",
    userType: "Clients",
    isBlocked: true,
  },
];

const USERS_PER_PAGE = 3;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function BanIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 15.5 7-7" />
    </svg>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-[#f0bb97] via-[#c4d3f4] to-[#86b8f2] text-[0.55rem] font-semibold text-slate-800">
      {initials}
    </div>
  );
}

function ModalShell({ children }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#071816]/75 p-4">
      {children}
    </div>
  );
}

function BlockUserModal({ user, onCancel, onConfirm }) {
  return (
    <ModalShell>
      <section className="w-full max-w-3xl rounded-[14px] bg-[#222d42] px-6 py-10 text-center shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-10 sm:py-14">
        <h1 className="text-[2.1rem] font-semibold leading-tight text-white sm:text-[3rem]">
          Do you want to {user.isBlocked ? "unblock" : "block"}
          <br />
          {user.name}?
        </h1>

        <div className="mx-auto mt-10 grid max-w-md gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onCancel}
            className="grid h-12 place-items-center rounded-[4px] border border-[#18ddd1] text-xl font-semibold text-[#18ddd1]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="grid h-12 place-items-center rounded-[4px] bg-[#ff4048] text-xl font-semibold text-white"
          >
            Yes, Confirm
          </button>
        </div>
      </section>
    </ModalShell>
  );
}

function UserDetailsModal({ user, onClose, onAction }) {
  const details = [
    ["Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone],
    ["Joining Date", user.joiningDate],
    ["User Type", user.userType],
  ];

  return (
    <ModalShell>
      <section className="w-full max-w-3xl rounded-[14px] bg-[#222d42] px-6 py-8 shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-10 sm:py-12">
        <div className="text-center">
          <h1 className="text-[2.25rem] font-semibold text-[#19ddd1] sm:text-[2.7rem]">User Details</h1>
          <p className="mt-3 text-lg text-white/70 sm:text-[1.05rem]">
            See all details about {user.name}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-linear-to-br from-[#e9d6ae] via-[#7fb6e9] to-[#4f83c7] text-sm font-semibold text-slate-900">
            {user.name
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>
          <h2 className="text-[2rem] font-medium text-[#19ddd1]">{user.name}</h2>
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
          <button
            type="button"
            onClick={onClose}
            className="grid h-12 place-items-center rounded-[4px] border border-[#18ddd1] text-xl font-semibold text-[#18ddd1]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAction}
            className="grid h-12 place-items-center rounded-[4px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] text-xl font-semibold text-white"
          >
            {user.isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </section>
    </ModalShell>
  );
}

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockTarget, setBlockTarget] = useState(null);
  usePageTitle("Users");

  const filteredUsers = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const sourceUsers = showBlockedOnly
      ? users.filter((user) => user.isBlocked)
      : users;

    if (!normalizedQuery) {
      return sourceUsers;
    }

    return sourceUsers.filter((user) =>
      [user.id, user.name, user.email].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    );
  }, [searchQuery, showBlockedOnly, users]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(pageStartIndex, pageStartIndex + USERS_PER_PAGE);
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, showBlockedOnly]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function openViewModal(user) {
    setSelectedUser(user);
  }

  function openBlockModal(user) {
    setSelectedUser(null);
    setBlockTarget(user);
  }

  function closeUserDetails() {
    setSelectedUser(null);
  }

  function closeBlockModal() {
    setBlockTarget(null);
  }

  function handleBlockFromDetails() {
    setBlockTarget(selectedUser);
    setSelectedUser(null);
  }

  function handleConfirmBlock() {
    const targetUser = blockTarget;
    setBlockTarget(null);

    if (targetUser) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === targetUser.id
            ? { ...user, isBlocked: !user.isBlocked }
            : user,
        ),
      );

      if (!targetUser.isBlocked) {
        setShowBlockedOnly(true);
      }
    }
  }

  return (
    <>
      <DashboardPanel
        title={showBlockedOnly ? "Blocked Users" : "User List"}
        contentClassName="px-0 py-0"
        action={
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <label className="flex h-11 min-w-[240px] items-center gap-3 rounded-[8px] border border-[#2b4f8a] bg-white px-4 text-sm text-slate-500 shadow-sm">
              <span className="text-[#27408b]">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search User"
                className="w-full bg-transparent outline-none placeholder:text-slate-400"
              />
            </label>
            <button
              type="button"
              onClick={() => setShowBlockedOnly((current) => !current)}
              className="h-11 rounded-[4px] bg-white px-6 text-sm font-semibold text-[#27408b] shadow-sm"
            >
              {showBlockedOnly ? "All Users" : "Blocked Users"}
            </button>
          </div>
        }
        headerClassName="flex-col items-start sm:flex-row sm:items-center"
      >
        <div className="px-4 py-3 sm:px-5 sm:py-4">
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[0.7fr_1.6fr_1.5fr_0.8fr] px-4 py-3 text-[0.95rem] text-[#1aded1]">
                <p>S.ID</p>
                <p>Full Name</p>
                <p>Email</p>
                <p className="text-center">Action</p>
              </div>
              {paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[0.7fr_1.6fr_1.5fr_0.8fr] items-center border-t border-white/55 px-4 py-3 text-[0.95rem] text-white"
                >
                  <p>{user.id}</p>
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} />
                    <span>{user.name}</span>
                  </div>
                  <p>{user.email}</p>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => openBlockModal(user)}
                      className="text-[#ff2d2d]"
                      aria-label={`${user.isBlocked ? "Unblock" : "Block"} ${user.name}`}
                    >
                      <BanIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => openViewModal(user)}
                      className="text-[#10dccf]"
                      aria-label={`View ${user.name}`}
                    >
                      <EyeIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 px-2 pb-4 text-[#12ddd0] md:flex-row md:items-center md:justify-between">
            <p className="text-[0.9rem]">
              SHOWING {filteredUsers.length === 0 ? 0 : pageStartIndex + 1}-
              {Math.min(pageStartIndex + paginatedUsers.length, filteredUsers.length)} OF {filteredUsers.length}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/75">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safeCurrentPage === 1}
                aria-label="Previous page"
                className="disabled:opacity-40"
              >
                ‹
              </button>
              {visiblePageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={[
                    "grid h-6 min-w-6 place-items-center rounded-[4px] px-1 text-[0.75rem]",
                    pageNumber === safeCurrentPage
                      ? "bg-[#14d9ce] text-white"
                      : "text-white/75",
                  ].join(" ")}
                  aria-label={`Go to page ${pageNumber}`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={safeCurrentPage === totalPages}
                aria-label="Next page"
                className="disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </DashboardPanel>

      {selectedUser ? (
        <UserDetailsModal
          user={selectedUser}
          onClose={closeUserDetails}
          onAction={handleBlockFromDetails}
        />
      ) : null}

      {blockTarget ? (
        <BlockUserModal
          user={blockTarget}
          onCancel={closeBlockModal}
          onConfirm={handleConfirmBlock}
        />
      ) : null}
    </>
  );
}
