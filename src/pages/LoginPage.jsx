import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { loginUser } from "../lib/api";

export function LoginPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      await loginUser(formValues);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthField
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <AuthField
          label="Password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
          error={errorMessage}
        />
        <div className="mt-2 flex text-base text-white md:text-lg">
          <Link
            to="/forgot-password"
            className="text-[#12e1d4] transition hover:text-[#6ff1ea]"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton type="submit">
          {isSubmitting ? "Signing In..." : "Sign In"}
        </AuthButton>
      </form>
    </section>
  );
}
