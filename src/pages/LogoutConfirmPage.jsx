import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePageTitle } from "../hooks/usePageTitle";
import { writeAuthSession } from "../lib/authStorage";
import { logOut } from "../store/slices/authSlice";

export function LogoutConfirmPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePageTitle("Logout");

  function handleLogout() {
    writeAuthSession(false);
    dispatch(logOut());
    navigate("/login", { replace: true });
  }

  return (
    <section className="mx-auto max-w-2xl rounded-[12px] bg-[#222d42] px-6 py-10 text-center shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-10 sm:py-12">
      <h1 className="text-[2rem] font-semibold text-white sm:text-[2.7rem]">Confirm logging out!</h1>

      <div className="mx-auto mt-8 grid max-w-sm gap-4 sm:grid-cols-2">
        <Link
          to="/dashboard"
          className="grid h-10 place-items-center rounded-[4px] border border-[#18ddd1] text-lg font-semibold text-[#18ddd1]"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="grid h-10 place-items-center rounded-[4px] bg-[#ff4048] text-lg font-semibold text-white"
        >
          Yes, Confirm
        </button>
      </div>
    </section>
  );
}
