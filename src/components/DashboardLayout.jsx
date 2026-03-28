import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutModal } from "./LogoutModal";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { getCurrentUser } from "../lib/api";
import { clearSession } from "../store/slices/authSlice";

export function DashboardLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(isAuthenticated && !user);

  useEffect(() => {
    if (!isAuthenticated || user) {
      setIsBootstrapping(false);
      return;
    }

    let isMounted = true;

    async function bootstrapSession() {
      try {
        await getCurrentUser();
      } catch {
        dispatch(clearSession());
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    }

    void bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isBootstrapping) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#efefee] text-slate-700">
        Loading dashboard...
      </div>
    );
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
