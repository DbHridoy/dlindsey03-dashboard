import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";

function PasswordAdornment() {
  return <span className="text-white/80">⌁</span>;
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 16V7" />
      <path d="m8.5 10.5 3.5-3.5 3.5 3.5" />
      <path d="M5 17.5a2.5 2.5 0 0 0 2.5 2.5h9A2.5 2.5 0 0 0 19 17.5" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  );
}

function Field({ label, type = "text", placeholder, right }) {
  return (
    <label className="grid gap-2 text-[1rem] text-white">
      <span>{label}</span>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="h-11 w-full rounded-[6px] border border-white/45 bg-[#243149]/70 px-3 text-white outline-none placeholder:text-white/70"
        />
        {right ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/80">
            {right}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export function CreateAdminPage() {
  usePageTitle("Create Admin");

  return (
    <DashboardPanel title="Create Admin" contentClassName="px-4 py-5 sm:px-6">
      <form className="grid gap-5">
          <Field label="Name" placeholder="jhon doe" />
          <Field label="Email" type="email" placeholder="abc@gmail.com" />

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="New Password"
              type="password"
              placeholder="********"
              right={<PasswordAdornment />}
            />
            <Field
              label="Confirm New Password"
              type="password"
              placeholder="********"
              right={<PasswordAdornment />}
            />
          </div>

          <div className="grid gap-3">
            <span className="text-[1rem] text-white">Profile Image</span>
            <button
              type="button"
              className="grid min-h-[98px] place-items-center rounded-[6px] bg-[#243149]/80 text-white/80"
            >
              <span className="grid justify-items-center gap-2">
                <UploadIcon />
                <span>Upload Image</span>
              </span>
            </button>
          </div>

          <button
            type="submit"
            className="mx-auto mt-1 h-11 w-full max-w-[440px] rounded-[6px] bg-linear-to-r from-[#32cbc9] to-[#11d9cd] text-lg font-semibold text-white"
          >
            Create Admin
          </button>
      </form>
    </DashboardPanel>
  );
}
