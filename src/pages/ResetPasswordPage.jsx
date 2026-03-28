import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { AuthPageTitle } from "../components/AuthPageTitle";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

function PasswordField({ label }) {
  return (
    <label className="grid gap-2 text-[1rem] text-white">
      <span>{label}</span>
      <div className="relative">
        <input
          type="password"
          placeholder="********"
          className="h-11 w-full rounded-[6px] border border-white/45 bg-transparent px-3 text-white outline-none placeholder:text-white/75"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/80">⌁</span>
      </div>
    </label>
  );
}

export function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isResetFlow = location.pathname === "/set-new-password" || !isAuthenticated;
  usePageTitle(isResetFlow ? "Set New Password" : "Change Password");

  function handleSubmit(event) {
    event.preventDefault();
    navigate(isResetFlow ? "/login" : "/setting");
  }

  if (isResetFlow) {
    return (
      <section className="mx-auto max-w-3xl">
        <AuthPageTitle
          title="Set New Password"
          description="Create a new password for your account. Use something secure and easy for you to remember."
        />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthField label="New Password" type="password" placeholder="Enter your new password" />
          <AuthField
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter your new password"
          />
          <AuthButton type="submit">Save Password</AuthButton>
        </form>
      </section>
    );
  }

  return (
    <DashboardPanel
      title="Change Password"
      backTo="/setting"
      contentClassName="px-4 py-6 sm:px-6 sm:py-8"
    >
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-[620px] gap-4">
          <PasswordField label="Current Password" />
          <PasswordField label="New Password" />
          <PasswordField label="Confirm New Password" />
          <button
            type="submit"
            className="mt-4 h-11 rounded-[6px] bg-linear-to-r from-[#32cbc9] to-[#11d9cd] text-lg font-semibold text-white"
          >
            Change Password
          </button>
      </form>
    </DashboardPanel>
  );
}
