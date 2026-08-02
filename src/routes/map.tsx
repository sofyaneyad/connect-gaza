import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { neighborhoods } from "@/data/mock";

const GazaMap = lazy(() => import("@/components/map/GazaMap"));

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "خريطة المقايضات — مقايضة غزة" },
      {
        name: "description",
        content: "خريطة تفاعلية لعروض وطلبات المقايضة في أحياء قطاع غزة مع تفاصيل كل منشور.",
      },
      { property: "og:title", content: "خريطة المقايضات — مقايضة غزة" },
      { property: "og:description", content: "اكتشف أقرب مقايضة إليك على الخريطة." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const skeleton = (
    <div className="grid h-[60vh] place-items-center rounded-3xl bg-secondary text-sm text-muted-foreground">
      جارٍ تحميل الخريطة…
    </div>
  );

  return (
    <AppShell crumbs={[{ label: "الخريطة" }]}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold">خريطة المقايضات</h1>
        <div className="flex gap-2 text-xs">
          <Badge className="rounded-full bg-primary text-primary-foreground">🎁 عروض</Badge>
          <Badge className="rounded-full bg-info text-info-foreground">🙋 طلبات</Badge>
        </div>
      </div>

      <ClientOnly fallback={skeleton}>
        <Suspense fallback={skeleton}>
          <GazaMap height="60vh" />
        </Suspense>
      </ClientOnly>

      <Card className="mt-4 rounded-3xl border-border/60 bg-card/80 p-4">
        <p className="mb-3 text-sm font-bold">الأحياء على الخريطة</p>
        <div className="flex flex-wrap gap-1.5">
          {neighborhoods.map((n) => (
            <Badge key={n.id} variant="secondary" className="rounded-full text-[11px]">
              {n.name} · {n.posts}
            </Badge>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
