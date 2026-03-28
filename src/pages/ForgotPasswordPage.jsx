import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { AuthPageTitle } from "../components/AuthPageTitle";
import { usePageTitle } from "../hooks/usePageTitle";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  usePageTitle("Forgot Password");

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/verify-otp");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <AuthPageTitle
        title="Forgot Password"
        description="Enter your email address and we will send you a verification code to reset your password."
      />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthField label="Email" type="email" placeholder="Enter your email" />
        <div className="mt-2 flex justify-center text-sm text-white sm:text-base md:text-lg">
          <Link
            to="/login"
            className="text-[#12e1d4] transition hover:text-[#6ff1ea]"
          >
            Back to sign in
          </Link>
        </div>
        <AuthButton type="submit">Get OTP</AuthButton>
      </form>
    </section>
  );
}
