import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { AuthPageTitle } from "../components/AuthPageTitle";
import { usePageTitle } from "../hooks/usePageTitle";
import { apiRequest } from "../lib/api";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  usePageTitle("Forgot Password");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setIsSubmitting(true);

    try {
      const payload = await apiRequest("/auth/send-otp", {
        method: "POST",
        body: { email },
      });

      setStatusMessage(payload.message || "OTP sent successfully");
      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      setErrorMessage(error.message || "Unable to send OTP");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <AuthPageTitle
        title="Forgot Password"
        description="Enter your email address and we will send you a verification code to reset your password."
      />
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          error={errorMessage}
          required
        />
        {statusMessage ? (
          <p className="text-base text-[#c6fffb]">{statusMessage}</p>
        ) : null}
        <div className="mt-2 flex justify-center text-sm text-white sm:text-base md:text-lg">
          <Link
            to="/login"
            className="text-[#12e1d4] transition hover:text-[#6ff1ea]"
          >
            Back to sign in
          </Link>
        </div>
        <AuthButton type="submit">
          {isSubmitting ? "Sending..." : "Get OTP"}
        </AuthButton>
      </form>
    </section>
  );
}
