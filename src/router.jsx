import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthLayout } from "./components/AuthLayout";
import { DashboardLayout } from "./components/DashboardLayout";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { LoginPage } from "./pages/LoginPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { VerifyOtpPage } from "./pages/VerifyOtpPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import { ReportsPage } from "./pages/ReportsPage";
import { CreateAdminPage } from "./pages/CreateAdminPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { UserDetailsPage } from "./pages/UserDetailsPage";
import { ConfirmUserBlockPage } from "./pages/ConfirmUserBlockPage";
import { BlockedUserDetailsPage } from "./pages/BlockedUserDetailsPage";
import { ReportDetailsPage } from "./pages/ReportDetailsPage";
import { ResolveReportPage } from "./pages/ResolveReportPage";

function HomeRedirect() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "verify-otp", element: <VerifyOtpPage /> },
      { path: "set-new-password", element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "user", element: <UsersPage /> },
      { path: "user-details", element: <UserDetailsPage /> },
      { path: "confirm-block-user", element: <ConfirmUserBlockPage /> },
      { path: "blocked-user-details", element: <BlockedUserDetailsPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "reports/:id", element: <ReportDetailsPage /> },
      { path: "reports/:id/resolve", element: <ResolveReportPage /> },
      { path: "create-admin", element: <CreateAdminPage /> },
      { path: "setting", element: <SettingsPage /> },
      { path: "change-password", element: <ChangePasswordPage /> },
      { path: "privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "terms-conditions", element: <TermsConditionsPage /> },
      { path: "about-us", element: <AboutUsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "notifications", element: <NotificationsPage /> },
    ],
  },
  {
    path: "*",
    element: <HomeRedirect />,
  },
]);
