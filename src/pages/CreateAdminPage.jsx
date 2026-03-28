import { useState } from "react";
import { usePageTitle } from "../hooks/usePageTitle";
import { DashboardPanel } from "../components/DashboardPanel";
import { apiRequest } from "../lib/api";

function PasswordAdornment() {
  return <span className="text-white/80">⌁</span>;
}

function Field({
  label,
  type = "text",
  placeholder,
  right,
  name,
  value,
  onChange,
}) {
  return (
    <label className="grid gap-2 text-[1rem] text-white">
      <span>{label}</span>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
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
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
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
    setStatusMessage("");

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = await apiRequest("/user", {
        method: "POST",
        body: {
          fullName: formValues.fullName,
          email: formValues.email,
          password: formValues.password,
          role: "admin",
        },
      });

      setStatusMessage(payload.message || "Admin created successfully");
      setFormValues({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Unable to create admin");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DashboardPanel title="Create Admin" contentClassName="px-4 py-5 sm:px-6">
      <form className="grid gap-5" onSubmit={handleSubmit}>
          <Field
            label="Name"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            placeholder="john doe"
          />
          <Field
            label="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="New Password"
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="********"
              right={<PasswordAdornment />}
            />
            <Field
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              right={<PasswordAdornment />}
            />
          </div>
          {errorMessage ? (
            <p className="text-sm font-medium text-[#ff4e4e]">{errorMessage}</p>
          ) : null}
          {statusMessage ? (
            <p className="text-sm font-medium text-[#c6fffb]">{statusMessage}</p>
          ) : null}

          <button
            type="submit"
            className="mx-auto mt-1 h-11 w-full max-w-[440px] rounded-[6px] bg-linear-to-r from-[#32cbc9] to-[#11d9cd] text-lg font-semibold text-white"
          >
            {isSubmitting ? "Creating..." : "Create Admin"}
          </button>
      </form>
    </DashboardPanel>
  );
}
