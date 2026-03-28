import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../lib/api";

export function LogoutModal({ onClose }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071816]/75 px-4">
      <div className="w-full max-w-md rounded-[12px] bg-[#222d42] px-6 py-10 text-center shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-10 sm:py-12">
        <h1 className="text-[2rem] font-semibold text-white sm:text-[2.4rem]">
          Confirm logging out!
        </h1>

        <div className="mx-auto mt-8 grid max-w-sm gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 place-items-center rounded-[4px] border border-[#18ddd1] text-lg font-semibold text-[#18ddd1]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isSubmitting}
            className="grid h-10 place-items-center rounded-[4px] bg-[#ff4048] text-lg font-semibold text-white"
          >
            {isSubmitting ? "Logging out..." : "Yes, Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
