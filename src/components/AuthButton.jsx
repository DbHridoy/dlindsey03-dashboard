export function AuthButton({ children, disabled = false, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="mt-6 h-13 w-full rounded-lg bg-white/90 text-lg font-semibold text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/90 disabled:text-white/75 md:h-14"
    >
      {children}
    </button>
  );
}
