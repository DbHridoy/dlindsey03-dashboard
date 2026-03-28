import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { AuthPageTitle } from "../components/AuthPageTitle";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";
import { apiRequest } from "../lib/api";

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
}) {
  return (
    <label className="grid gap-2 text-[1rem] text-white">
      <span>{label}</span>
      <div className="relative">
        <input
          type="password"
          name={name}
          value={value}
          onChange={onChange}
          placeholder="********"
          className="h-11 w-full rounded-[6px] border border-white/45 bg-transparent px-3 text-white outline-none placeholder:text-white/75"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/80">⌁</span>
      </div>
      {error ? <p className="text-sm text-[#ff4e4e]">{error}</p> : null}
    </label>
  );
}

export function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isResetFlow = location.pathname === "/set-new-password" || !isAuthenticated;
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  usePageTitle(isResetFlow ? "Set New Password" : "Change Password");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setIsSubmitting(true);

    try {
      if (isResetFlow) {
        const email = location.state?.email;

        if (!email) {
          throw new Error("Reset email is missing. Start again.");
        }

        await apiRequest("/auth/set-new-password", {
          method: "POST",
          body: {
            email,
            newPassword: formValues.newPassword,
            confirmPassword: formValues.confirmPassword,
          },
        });

        navigate("/login", { replace: true });
      } else {
        const payload = await apiRequest("/auth/change-password", {
          method: "POST",
          body: {
            currentPassword: formValues.currentPassword,
            newPassword: formValues.newPassword,
            confirmPassword: formValues.confirmPassword,
          },
        });

        setStatusMessage(payload.message || "Password changed successfully");
        setFormValues({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/setting");
      }
    } catch (error) {
      setErrorMessage(error.message || "Unable to save password");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isResetFlow) {
    return (
      <section className="mx-auto max-w-3xl">
        <AuthPageTitle
          title="Set New Password"
          description="Create a new password for your account. Use something secure and easy for you to remember."
        />
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthField
            label="New Password"
            type="password"
            name="newPassword"
            value={formValues.newPassword}
            onChange={handleChange}
            placeholder="Enter your new password"
            required
          />
          <AuthField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your new password"
            error={errorMessage}
            required
          />
          <AuthButton type="submit">
            {isSubmitting ? "Saving..." : "Save Password"}
          </AuthButton>
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
          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={formValues.currentPassword}
            onChange={handleChange}
          />
          <PasswordField
            label="New Password"
            name="newPassword"
            value={formValues.newPassword}
            onChange={handleChange}
          />
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={errorMessage}
          />
          {statusMessage ? (
            <p className="text-sm font-medium text-[#c6fffb]">{statusMessage}</p>
          ) : null}
          <button
            type="submit"
            className="mt-4 h-11 rounded-[6px] bg-linear-to-r from-[#32cbc9] to-[#11d9cd] text-lg font-semibold text-white"
          >
            {isSubmitting ? "Saving..." : "Change Password"}
          </button>
      </form>
    </DashboardPanel>
  );
}
