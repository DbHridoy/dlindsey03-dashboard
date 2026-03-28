import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogoutModal } from "./LogoutModal";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout() {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen bg-[#efefee] p-3 text-white md:p-4">
      <Topbar />
      <div className="md:pl-[254px]">
        <Sidebar onLogoutClick={() => setLogoutModalOpen(true)} />
        <main className="px-0 pb-0 pt-[82px] md:pt-[86px]">
          <Outlet />
        </main>
      </div>
      {logoutModalOpen ? (
        <LogoutModal onClose={() => setLogoutModalOpen(false)} />
      ) : null}
    </div>
  );
}
