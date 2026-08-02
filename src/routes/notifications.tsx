import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, BellRing, Check, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser, notifications as seed, type Notification } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "الإشعارات — مقايضة غزة" },
      {
        name: "description",
        content: "تابع طلبات المقايضة والتعليقات والرسائل والقبول والرفض في مكان واحد.",
      },
      { property: "og:title", content: "الإشعارات — مقايضة غزة" },
      { property: "og:description", content: "كل تحديثات مقايضاتك في مكان واحد." },
    ],
  }),
  component: NotificationsPage,
});

const meta: Record<Notification["kind"], { icon: typeof BellRing; label: string; tone: string }> = {
  comment: { icon: MessageSquare, label: "تعليق", tone: "bg-info/12 text-info" },
  barter: { icon: ArrowLeftRight, label: "طلب مقايضة", tone: "bg-primary-soft text-primary" },
  accepted: { icon: Check, label: "مقبول", tone: "bg-success/12 text-success" },
  rejected: { icon: X, label: "مرفوض", tone: "bg-destructive/12 text-destructive" },
  message: { icon: MessageSquare, label: "رسالة", tone: "bg-warning/15 text-warning-foreground" },
};

function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(seed);
  const [tab, setTab] = useState<"all" | "unread" | "barter">("all");

  const list = items.filter((n) =>
    tab === "all" ? true : tab === "unread" ? !n.read : n.kind === "barter",
  );

  return (
    <AppShell crumbs={[{ label: "الإشعارات" }]}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold">الإشعارات</h1>
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full"
          onClick={() => {
            setItems((p) => p.map((n) => ({ ...n, read: true })));
            toast.success("تم تعليم الكل كمقروء");
          }}
        >
          تعليم الكل كمقروء
        </Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mb-4">
        <TabsList className="grid w-full grid-cols-3 rounded-full sm:w-auto sm:inline-grid">
          <TabsTrigger value="all" className="rounded-full">
            الكل
          </TabsTrigger>
          <TabsTrigger value="unread" className="rounded-full">
            غير المقروءة
          </TabsTrigger>
          <TabsTrigger value="barter" className="rounded-full">
            طلبات المقايضة
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ul className="space-y-2.5">
        {list.map((n) => {
          const u = getUser(n.userId);
          const m = meta[n.kind];
          const Icon = m.icon;
          return (
            <li key={n.id}>
              <Card
                className={cn(
                  "animate-rise flex items-start gap-3 rounded-3xl border-border/60 p-4 transition-colors",
                  n.read ? "bg-card/70" : "bg-primary-soft/40",
                )}
              >
                <div className="relative shrink-0">
                  <Avatar className="size-11">
                    <AvatarImage src={u.avatar} alt={u.name} />
                    <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className={cn("absolute -bottom-1 -end-1 grid size-6 place-items-center rounded-full", m.tone)}>
                    <Icon className="size-3.5" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{u.name}</span>
                    <Badge variant="secondary" className="rounded-full text-[10px]">
                      {m.label}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground/80">{n.text}</p>
                  {n.kind === "barter" && (
                    <div className="mt-2 flex gap-2">
                      <Button
                        size="sm"
                        variant="hero"
                        className="rounded-full"
                        onClick={() => toast.success("تم قبول طلب المقايضة (تجريبي)")}
                      >
                        قبول
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-full"
                        onClick={() => toast.success("تم رفض الطلب (تجريبي)")}
                      >
                        رفض
                      </Button>
                    </div>
                  )}
                </div>
                {!n.read && <span className="mt-2 size-2.5 shrink-0 rounded-full bg-primary" />}
              </Card>
            </li>
          );
        })}
        {list.length === 0 && (
          <Card className="rounded-3xl p-10 text-center text-sm text-muted-foreground">
            لا توجد إشعارات في هذا التصنيف.
          </Card>
        )}
      </ul>
    </AppShell>
  );
}
