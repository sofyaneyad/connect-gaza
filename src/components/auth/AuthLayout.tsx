import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="gradient-primary relative hidden flex-col justify-between p-10 text-primary-foreground lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-10 place-items-center rounded-xl bg-primary-foreground/15">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 8h11l-3-3M20 16H9l3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold">مقايضة غزة</span>
        </Link>
        <div className="max-w-md">
          <h2 className="font-display text-3xl font-extrabold leading-snug">
            مجتمع واحد… يتبادل الخدمات والسلع بدون نقود
          </h2>
          <p className="mt-3 text-primary-foreground/85">
            انضم إلى أكثر من 18 ألف جار في 13 حياً داخل قطاع غزة، واعرض ما تستطيع تقديمه مقابل ما
            تحتاجه.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-primary-foreground/85">
            <li>• منشورات عرض وطلب داخل حيّك أو للجميع</li>
            <li>• خريطة تفاعلية لأقرب المقايضات</li>
            <li>• محادثات مباشرة وتقييمات للجيران</li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">واجهة تجريبية · بيانات وهمية</p>
      </div>

      <div className="flex items-center justify-center p-5 sm:p-8">
        <Card className="w-full max-w-md rounded-3xl border-border/60 bg-card/85 p-6 shadow-card sm:p-8">
          <Link to="/" className="mb-5 flex items-center gap-2 lg:hidden">
            <span className="gradient-primary grid size-9 place-items-center rounded-xl text-primary-foreground">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 8h11l-3-3M20 16H9l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="font-display font-bold">مقايضة غزة</span>
          </Link>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
          {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
        </Card>
      </div>
    </div>
  );
}
