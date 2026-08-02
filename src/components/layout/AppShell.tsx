import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, Home } from "lucide-react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export type Crumb = { label: string; to?: string };

export function AppShell({
  children,
  right,
  crumbs,
  wide,
}: {
  children: ReactNode;
  right?: ReactNode;
  crumbs?: Crumb[];
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-3 py-5 sm:px-4">
        <Sidebar />
        <main className={`min-w-0 flex-1 ${wide ? "" : "max-w-full"}`}>
          {crumbs?.length ? (
            <nav className="mb-4 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <Link to="/" className="inline-flex items-center gap-1 hover:text-primary">
                <Home className="size-3.5" /> الرئيسية
              </Link>
              {crumbs.map((c) => (
                <span key={c.label} className="inline-flex items-center gap-1">
                  <ChevronLeft className="size-3.5" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          ) : null}
          {children}
        </main>
        {right ? (
          <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-80 shrink-0 overflow-y-auto pb-8 xl:block no-scrollbar">
            {right}
          </aside>
        ) : null}
      </div>
      <SiteFooter />
      <MobileTabBar />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border/60 bg-card/60 pb-20 lg:pb-8">
      <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold text-gradient-primary">مقايضة غزة</p>
          <p className="mt-2 text-sm text-muted-foreground">
            منصة مجتمعية لتبادل الخدمات والسلع بين أحياء قطاع غزة بدون استخدام النقود.
          </p>
        </div>
        <FooterCol
          title="المنصة"
          items={[
            { label: "الرئيسية", to: "/" },
            { label: "الخريطة", to: "/map" },
            { label: "بحث", to: "/search" },
            { label: "إنشاء منشور", to: "/create-post" },
          ]}
        />
        <FooterCol
          title="الحساب"
          items={[
            { label: "تسجيل الدخول", to: "/login" },
            { label: "إنشاء حساب", to: "/register" },
            { label: "الإشعارات", to: "/notifications" },
            { label: "المحادثات", to: "/messages" },
          ]}
        />
        <div>
          <p className="mb-2 text-sm font-semibold">إرشادات المقايضة</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>لا تُطلب مبالغ مالية داخل المنصة.</li>
            <li>التقِ في مكان عام وآمن.</li>
            <li>اتفق على التفاصيل قبل التبادل.</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © 2026 مقايضة غزة · واجهة تجريبية ببيانات وهمية
      </p>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="hover:text-primary">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileTabBar() {
  const items = [
    { to: "/", label: "الرئيسية" },
    { to: "/search", label: "بحث" },
    { to: "/create-post", label: "جديد" },
    { to: "/map", label: "الخريطة" },
    { to: "/messages", label: "رسائل" },
  ];
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border/60 py-2 lg:hidden">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          activeOptions={{ exact: i.to === "/" }}
          activeProps={{ className: "text-primary font-semibold" }}
          className="px-3 py-1 text-[11px] text-muted-foreground"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}
