import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import sidebarLogo from "../assets/sidebar-logo.svg";

function VaultLifeLogo() {
  return (
    <div className="mb-12 text-center">
      <img
        src={sidebarLogo}
        alt="VaultLife"
        className="mx-auto h-auto w-full max-w-[275px]"
      />
    </div>
  );
}

export function AuthLayout() {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="min-h-screen bg-[#071816] p-3 md:p-4">
      <div className="mx-auto min-h-[calc(100vh-1.5rem)] max-w-7xl rounded-2xl bg-linear-to-br from-[#24438d] via-[#14576c] to-[#0c1d1b] px-5 py-10 md:min-h-[calc(100vh-2rem)] md:px-12 md:py-14">
        <div className="mx-auto w-full max-w-3xl pt-1 md:pt-4">
          <VaultLifeLogo />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
