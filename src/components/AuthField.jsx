export function AuthField({
  label,
  type = "text",
  placeholder = "",
  error,
  trailingIcon,
  name,
  value,
  onChange,
  autoComplete,
  disabled = false,
  required = false,
}) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-xl font-semibold text-white md:text-[1.75rem]">
          {label}
        </span>
      ) : null}
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          className="h-13 w-full rounded-lg border border-white/35 bg-white/95 px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 md:h-14 md:text-lg"
        />
        {trailingIcon ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/85">
            {trailingIcon}
          </span>
        ) : null}
      </div>
      {error ? <p className="mt-3 text-base text-[#ff4e4e]">{error}</p> : null}
    </label>
  );
}
