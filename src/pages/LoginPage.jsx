import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthButton } from "../components/AuthButton";
import { AuthField } from "../components/AuthField";
import { writeAuthSession } from "../lib/authStorage";
import { logIn } from "../store/slices/authSlice";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    writeAuthSession(true);
    dispatch(logIn());
    navigate("/dashboard");
  }

  return (
    <section className="mx-auto max-w-3xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AuthField label="Email" type="email" />
        <AuthField label="Password" type="password" />
        <div className="mt-2 flex text-base text-white md:text-lg">
          <Link
            to="/forgot-password"
            className="text-[#12e1d4] transition hover:text-[#6ff1ea]"
          >
            Forgot password?
          </Link>
        </div>

        <AuthButton type="submit">Sign In</AuthButton>
      </form>
    </section>
  );
}
