import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "استعادة كلمة المرور — مقايضة غزة" },
      { name: "description", content: "أرسل رمز استعادة كلمة المرور لحسابك في منصة مقايضة غزة." },
      { property: "og:title", content: "استعادة كلمة المرور — مقايضة غزة" },
      { property: "og:description", content: "استعد الوصول إلى حسابك برمز تحقق." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="نسيت كلمة المرور"
      subtitle="سنرسل لك رمز تحقق مكوناً من 6 أرقام"
      footer={
        <Link to="/login" className="font-semibold text-primary hover:underline">
          العودة لتسجيل الدخول
        </Link>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("تم إرسال رمز التحقق (تجريبي)");
          navigate({ to: "/verify" });
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="recover">رقم الهاتف أو البريد</Label>
          <Input id="recover" placeholder="059xxxxxxx" className="h-11 rounded-xl" />
        </div>
        <Button type="submit" variant="hero" className="h-11 w-full rounded-xl">
          <KeyRound className="size-4" /> إرسال الرمز
        </Button>
      </form>
    </AuthLayout>
  );
}
