import { useAuth } from "@/hooks/use-auth";
import { ArrowRight, Loader2, Mail, UserX } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (error) {
      console.error("Email sign-in error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch {
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (error) {
      setError(
        `Failed to continue as guest: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2276E3] to-[#1A5DB8] flex flex-col">
      {/* Blue header bar */}
      <div className="bg-[#2276E3] px-6 py-4">
        <div className="mx-auto max-w-lg flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Chalo Trip Pe"
              className="h-8 w-auto brightness-0 invert"
            />
          </a>
          <span className="text-sm text-white/70">Weekend Escapes</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center pt-8 pb-16 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] overflow-hidden">
            {/* Top accent */}
            <div className="h-1 bg-gradient-to-r from-[#2276E3] via-[#FF6B35] to-[#FFB800]" />

            <div className="p-8">
              {step === "signIn" ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Login or Sign Up
                  </h1>
                  <p className="text-sm text-gray-500 mb-6">
                    Access your bookings, saved trips, and exclusive deals
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="auth-email" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                        <input
                          id="auth-email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          disabled={isLoading}
                          required
                          aria-required="true"
                          aria-describedby={error ? 'auth-error' : undefined}
                          className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2276E3]/20 focus:border-[#2276E3] transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <div id="auth-error" role="alert" className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      aria-label="Continue with email to receive OTP"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2276E3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1A5DB8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <>
                          Continue with Email
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    <div className="relative my-5">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-xs text-gray-400 font-medium">
                          OR
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGuestLogin}
                      disabled={isLoading}
                      aria-label="Continue as guest without signing in"
                      className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    >
                      <UserX className="h-4 w-4" aria-hidden="true" />
                      Continue as Guest
                    </button>
                  </form>

                  <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-[#2276E3] hover:underline">
                      Terms
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-[#2276E3] hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Verify OTP
                  </h1>
                  <p className="text-sm text-gray-500 mb-6">
                    Enter the 6-digit code sent to{" "}
                    <span className="font-semibold text-gray-700">
                      {step.email}
                    </span>
                  </p>

                  <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <input type="hidden" name="email" value={step.email} />
                    <input type="hidden" name="code" value={otp} />

                    <div className="flex justify-center">
                      <InputOTP
                        value={otp}
                        onChange={setOtp}
                        maxLength={6}
                        disabled={isLoading}
                        onKeyDown={(e) => {
                          if (
                            e.key === "Enter" &&
                            otp.length === 6 &&
                            !isLoading
                          ) {
                            const form = (
                              e.target as HTMLElement
                            ).closest("form");
                            if (form) form.requestSubmit();
                          }
                        }}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {error && (
                      <div role="alert" className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        <p className="text-sm text-red-600 text-center">
                          {error}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      aria-label="Verify OTP code and login"
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2276E3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1A5DB8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify & Login
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep("signIn");
                        setOtp("");
                        setError(null);
                      }}
                      disabled={isLoading}
                      className="w-full text-center text-sm text-gray-500 hover:text-[#2276E3] transition-colors py-2 font-medium"
                    >
                      ← Use a different email
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Bottom info */}
            <div className="bg-gray-50 border-t border-gray-100 px-8 py-4">
              <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
                <span>🔒 Secure Login</span>
                <span>•</span>
                <span>256-bit Encrypted</span>
                <span>•</span>
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense>
      <Auth {...props} />
    </Suspense>
  );
}
