import { useEffect, useMemo, useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";
import { apiRequest } from "../lib/api";

const USERS_PER_PAGE = 10;

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

function formatDate(value) {
  if (!value) {
    return "N/A";
  }

  return new Date(value).toLocaleDateString();
}

function mapUser(user) {
  return {
    id: user._id,
    name: user.fullName,
    email: user.email,
    phone: user.phoneNumber || "N/A",
    joiningDate: formatDate(user.createdAt),
    userType: user.role,
    isBlocked: Boolean(user.isBlocked),
    rawUser: user,
  };
}

function ModalActionButton({ children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className="grid h-12 place-items-center rounded-[4px] bg-linear-to-r from-[#35cac8] to-[#17dcd0] text-xl font-semibold text-white"
    >
      {children}
    </button>
  );
}

function BlockUserModal({ user, onCancel, onConfirm, isSubmitting }) {
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
            disabled={isSubmitting}
            className="grid h-12 place-items-center rounded-[4px] bg-[#ff4048] text-xl font-semibold text-white"
          >
            {isSubmitting ? "Saving..." : "Yes, Confirm"}
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
          <ModalActionButton onClick={onAction}>
            {user.isBlocked ? "Unblock" : "Block"}
          </ModalActionButton>
        </div>
      </section>
    </ModalShell>
  );
}

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlockedOnly, setShowBlockedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockTarget, setBlockTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUpdatingBlockState, setIsUpdatingBlockState] = useState(false);
  usePageTitle("Users");

  const totalPages = Math.max(1, Math.ceil(totalUsers / USERS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStartIndex = (safeCurrentPage - 1) * USERS_PER_PAGE;
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const payload = await apiRequest("/user", {
          query: {
            page: safeCurrentPage,
            limit: USERS_PER_PAGE,
            search: searchQuery.trim(),
            isBlocked: showBlockedOnly ? true : undefined,
          },
        });

        if (!isMounted) {
          return;
        }

        setUsers((payload.data || []).map(mapUser));
        setTotalUsers(payload.total || 0);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setUsers([]);
        setTotalUsers(0);
        setErrorMessage(error.message || "Unable to load users");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      isMounted = false;
    };
  }, [safeCurrentPage, searchQuery, showBlockedOnly]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, showBlockedOnly]);

  const paginatedUsers = useMemo(() => users, [users]);

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

  async function handleConfirmBlock() {
    const targetUser = blockTarget;

    if (!targetUser) {
      return;
    }

    setIsUpdatingBlockState(true);

    try {
      const formData = new FormData();
      formData.append("isBlocked", String(!targetUser.isBlocked));

      const payload = await apiRequest(`/user/${targetUser.id}`, {
        method: "PATCH",
        body: formData,
      });

      const nextUser = mapUser(payload.data);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === nextUser.id ? nextUser : user,
        ),
      );
      setBlockTarget(null);
      setSelectedUser(null);

      if (!targetUser.isBlocked) {
        setShowBlockedOnly(true);
      }
    } catch (error) {
      setErrorMessage(error.message || "Unable to update user");
    } finally {
      setIsUpdatingBlockState(false);
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
          {errorMessage ? (
            <p className="px-4 pb-3 text-sm font-medium text-[#ff4e4e]">
              {errorMessage}
            </p>
          ) : null}
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[0.7fr_1.6fr_1.5fr_0.8fr] px-4 py-3 text-[0.95rem] text-[#1aded1]">
                <p>S.ID</p>
                <p>Full Name</p>
                <p>Email</p>
                <p className="text-center">Action</p>
              </div>
              {isLoading ? (
                <div className="border-t border-white/55 px-4 py-8 text-center text-white">
                  Loading users...
                </div>
              ) : null}
              {!isLoading && paginatedUsers.length === 0 ? (
                <div className="border-t border-white/55 px-4 py-8 text-center text-white">
                  No users found.
                </div>
              ) : null}
              {!isLoading && paginatedUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[0.7fr_1.6fr_1.5fr_0.8fr] items-center border-t border-white/55 px-4 py-3 text-[0.95rem] text-white"
                >
                  <p>{String(pageStartIndex + index + 1).padStart(2, "0")}</p>
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
              SHOWING {totalUsers === 0 ? 0 : pageStartIndex + 1}-
              {Math.min(pageStartIndex + paginatedUsers.length, totalUsers)} OF {totalUsers}
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
          isSubmitting={isUpdatingBlockState}
        />
      ) : null}
    </>
  );
}
