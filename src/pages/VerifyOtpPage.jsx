import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "../components/AuthButton";
import { AuthPageTitle } from "../components/AuthPageTitle";
import { usePageTitle } from "../hooks/usePageTitle";

const OTP_LENGTH = 4;

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(() => Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);
  usePageTitle("Verify OTP");

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/set-new-password");
  }

  function handleChange(index, value) {
    const nextValue = value.replace(/\D/g, "").slice(-1);

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp];
      nextOtp[index] = nextValue;
      return nextOtp;
    });

    if (nextValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (pastedDigits.length === 0) {
      return;
    }

    setOtp((currentOtp) => {
      const nextOtp = [...currentOtp];

      for (let index = 0; index < OTP_LENGTH; index += 1) {
        nextOtp[index] = pastedDigits[index] || "";
      }

      return nextOtp;
    });

    inputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH) - 1]?.focus();
  }

  return (
    <section className="mx-auto max-w-3xl">
      <AuthPageTitle
        title="Verify OTP"
        description="Please check your email. We have sent a verification code to your inbox."
      />
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-4 md:gap-5" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={`otp-${index}`}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              className="h-14 w-14 rounded-lg border border-white/35 bg-white/95 text-center text-2xl font-semibold text-slate-900 outline-none focus:border-[#12e1d4] md:h-16 md:w-16 md:text-3xl"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3 text-sm text-white sm:flex-row sm:justify-between sm:text-base md:text-lg">
          <Link
            to="/forgot-password"
            className="text-[#12e1d4] transition hover:text-[#6ff1ea]"
          >
            Change email
          </Link>
          {/* <Link
            to="/verify-otp"
            className="text-[#12e1d4] transition hover:text-[#6ff1ea]"
          >
            Resend code
          </Link> */}
        </div>

        <AuthButton type="submit">Verify</AuthButton>
      </form>
    </section>
  );
}
