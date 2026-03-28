import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export function ConfirmUserBlockPage() {
  usePageTitle("Confirm Block User");

  return (
    <div className="grid min-h-[calc(100vh-110px)] place-items-center rounded-[14px] bg-transparent p-4">
      <section className="w-full max-w-3xl rounded-[14px] bg-[#222d42] px-6 py-10 text-center shadow-[0_10px_26px_rgba(15,24,28,0.22)] sm:px-10 sm:py-14">
        <h1 className="text-[2.4rem] font-semibold leading-tight text-white sm:text-[3.2rem]">
          Do you want to Block
          <br />
          this user?
        </h1>

        <div className="mx-auto mt-10 grid max-w-md gap-4 sm:grid-cols-2">
          <Link
            to="/user-details"
            className="grid h-12 place-items-center rounded-[4px] border border-[#18ddd1] text-xl font-semibold text-[#18ddd1]"
          >
            Cancel
          </Link>
          <Link
            to="/blocked-user-details"
            className="grid h-12 place-items-center rounded-[4px] bg-[#ff4048] text-xl font-semibold text-white"
          >
            Yes, Confirm
          </Link>
        </div>
      </section>
    </div>
  );
}
