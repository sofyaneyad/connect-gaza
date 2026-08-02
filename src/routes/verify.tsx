import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "تأكيد الحساب — مقايضة غزة" },
      { name: "description", content: "أدخل رمز التحقق المرسل إلى هاتفك لتأكيد حسابك." },
      { property: "og:title", content: "تأكيد الحساب — مقايضة غزة" },
      { property: "og:description", content: "أدخل رمز التحقق المكوّن من 6 أرقام." },
    ],
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  return (
    <AuthLayout
      title="تأكيد الحساب"
      subtitle="أدخل الرمز المرسل إلى 059••••••"
      footer={
        <>
          لم يصلك الرمز؟{" "}
          <button
            onClick={() => toast.success("تم إعادة إرسال الرمز (تجريبي)")}
            className="font-semibold text-primary hover:underline"
          >
            إعادة الإرسال
          </button>
          <div className="mt-2">
            <Link to="/login" className="text-primary hover:underline">
              تسجيل الدخول
            </Link>
          </div>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("تم تأكيد الحساب (تجريبي)");
          navigate({ to: "/" });
        }}
      >
        <div dir="ltr" className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="size-12 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" variant="hero" className="h-11 w-full rounded-xl">
          <ShieldCheck className="size-4" /> تأكيد
        </Button>
      </form>
    </AuthLayout>
  );
}
