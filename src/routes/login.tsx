import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — مقايضة غزة" },
      { name: "description", content: "ادخل إلى حسابك في منصة مقايضة غزة وتابع عروض وطلبات حيّك." },
      { property: "og:title", content: "تسجيل الدخول — مقايضة غزة" },
      { property: "og:description", content: "ادخل إلى حسابك وتابع مقايضات حيّك." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <AuthLayout
      title="تسجيل الدخول"
      subtitle="أدخل رقم هاتفك أو بريدك للمتابعة (تجريبي بالكامل)"
      footer={
        <>
          ليس لديك حساب؟{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            أنشئ حساباً
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("تم تسجيل الدخول (تجريبي)");
          navigate({ to: "/" });
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="identifier">رقم الهاتف أو البريد</Label>
          <Input id="identifier" placeholder="059xxxxxxx" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">كلمة المرور</Label>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 rounded-xl pe-10"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label="إظهار كلمة المرور"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <Checkbox /> تذكّرني
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">
            نسيت كلمة المرور؟
          </Link>
        </div>
        <Button type="submit" variant="hero" className="h-11 w-full rounded-xl">
          <LogIn className="size-4" /> دخول
        </Button>
      </form>
    </AuthLayout>
  );
}
