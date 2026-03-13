import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useActor } from "@/hooks/useActor";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const { actor } = useActor();
  const [step, setStep] = useState<"contact" | "otp">("contact");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSendOtp = async () => {
    if (!contact.trim()) {
      toast.error("Please enter your phone number or email.");
      return;
    }
    if (!actor) {
      toast.error("App is still loading. Please wait a moment.");
      return;
    }
    setIsSending(true);
    try {
      const code = await actor.generateOtp(contact.trim());
      setDemoOtp(code);
      setStep("otp");
      toast.success("OTP sent! Check the banner below.");
    } catch (_err) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    if (!actor) {
      toast.error("App is still loading. Please wait a moment.");
      return;
    }
    setIsVerifying(true);
    try {
      const ok = await actor.verifyOtp(contact.trim(), otp);
      if (ok) {
        setVerified(true);
        setTimeout(() => onLoginSuccess(), 1200);
      } else {
        toast.error("Incorrect OTP. Please try again.");
      }
    } catch (_err) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      <div className="absolute top-1/3 right-0 w-48 h-48 bg-amber-400/10 rounded-full translate-x-1/2 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[390px] relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-lg mb-4">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            TravelSathi
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your travel companion across India
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-xl border border-border p-7">
          {!verified ? (
            <>
              {step === "contact" && (
                <motion.div
                  key="contact-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Sign in to continue
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Enter your phone or email to receive an OTP
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Phone number or Email
                      </p>
                      <Input
                        data-ocid="login.input"
                        type="text"
                        placeholder="+91 98765 43210 or hello@email.com"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                        className="h-12 rounded-xl text-base"
                        autoComplete="tel"
                      />
                    </div>

                    <Button
                      data-ocid="login.primary_button"
                      onClick={handleSendOtp}
                      disabled={isSending}
                      className="w-full h-12 rounded-xl text-base font-semibold"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Send OTP
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "otp" && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground">
                      Enter your OTP
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Sent to{" "}
                      <span className="text-foreground font-medium">
                        {contact}
                      </span>
                    </p>
                  </div>

                  {/* Demo OTP Banner */}
                  {demoOtp && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4 flex gap-3"
                      data-ocid="login.success_state"
                    >
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-amber-800">
                          Demo Mode
                        </p>
                        <p className="text-xs text-amber-700 mt-0.5">
                          Real SMS/email delivery is unavailable on this plan.
                          Your OTP is:{" "}
                          <span className="font-bold text-base tracking-widest text-amber-900">
                            {demoOtp}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-3">
                        6-digit OTP
                      </p>
                      <div
                        data-ocid="login.otp_input"
                        className="flex justify-center"
                      >
                        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="h-12 w-12 text-lg"
                            />
                            <InputOTPSlot
                              index={1}
                              className="h-12 w-12 text-lg"
                            />
                            <InputOTPSlot
                              index={2}
                              className="h-12 w-12 text-lg"
                            />
                            <InputOTPSlot
                              index={3}
                              className="h-12 w-12 text-lg"
                            />
                            <InputOTPSlot
                              index={4}
                              className="h-12 w-12 text-lg"
                            />
                            <InputOTPSlot
                              index={5}
                              className="h-12 w-12 text-lg"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </div>

                    <Button
                      data-ocid="login.submit_button"
                      onClick={handleVerify}
                      disabled={isVerifying || otp.length !== 6}
                      className="w-full h-12 rounded-xl text-base font-semibold"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setStep("contact");
                        setOtp("");
                        setDemoOtp(null);
                      }}
                      className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
                    >
                      ← Change phone / email
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Error state placeholder */}
              <div data-ocid="login.error_state" className="hidden" />
            </>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 flex flex-col items-center gap-4"
              data-ocid="login.success_state"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">
                  Welcome aboard!
                </p>
                <p className="text-muted-foreground text-sm mt-1">
                  Taking you in...
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
