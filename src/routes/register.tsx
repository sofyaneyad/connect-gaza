import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { neighborhoods } from "@/data/mock";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "إنشاء حساب — مقايضة غزة" },
      {
        name: "description",
        content: "أنشئ حساباً في منصة مقايضة غزة، اختر حيّك وابدأ بتبادل الخدمات والسلع.",
      },
      { property: "og:title", content: "إنشاء حساب — مقايضة غزة" },
      { property: "og:description", content: "اختر حيّك وابدأ المقايضة مع الجيران." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="إنشاء حساب"
      subtitle="سجّل بياناتك واختر حيّك للانضمام إلى مجتمع المقايضة"
      footer={
        <>
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("تم إنشاء الحساب، أدخل رمز التحقق (تجريبي)");
          navigate({ to: "/verify" });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="fname">الاسم الأول</Label>
            <Input id="fname" placeholder="أحمد" className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lname">اسم العائلة</Label>
            <Input id="lname" placeholder="أبو ناصر" className="h-11 rounded-xl" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input id="phone" placeholder="059xxxxxxx" className="h-11 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <Label>الحي</Label>
          <Select defaultValue="rimal">
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue placeholder="اختر حيّك" />
            </SelectTrigger>
            <SelectContent>
              {neighborhoods.map((n) => (
                <SelectItem key={n.id} value={n.id}>
                  {n.name} — {n.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pass">كلمة المرور</Label>
          <Input id="pass" type="password" placeholder="••••••••" className="h-11 rounded-xl" />
        </div>
        <label className="flex items-start gap-2 text-xs text-muted-foreground">
          <Checkbox className="mt-0.5" /> أوافق على إرشادات المقايضة وعدم طلب أي مقابل مالي داخل
          المنصة.
        </label>
        <Button type="submit" variant="hero" className="h-11 w-full rounded-xl">
          <UserPlus className="size-4" /> إنشاء الحساب
        </Button>
      </form>
    </AuthLayout>
  );
}
