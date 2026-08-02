import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, Globe2, Home as HomeIcon, PlusCircle, Sparkles, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  categories,
  currentUser,
  getNeighborhood,
  getUser,
  neighborhoods,
  posts,
} from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مقايضة غزة — تبادل الخدمات والسلع بين الأحياء" },
      {
        name: "description",
        content:
          "تصفّح عروض وطلبات المقايضة في حيّك وفي كل أحياء قطاع غزة: خدمات، سلع، شحن، صيانة، تعليم ونقل.",
      },
      { property: "og:title", content: "مقايضة غزة — تبادل الخدمات والسلع بين الأحياء" },
      {
        property: "og:description",
        content: "منصة مجتمعية لتبادل الخدمات والسلع بدون نقود داخل قطاع غزة.",
      },
    ],
  }),
  component: HomePage,
});

type FeedKey = "hood" | "public";

function HomePage() {
  const hood = getNeighborhood(currentUser.neighborhoodId);
  const [feed, setFeed] = useState<FeedKey>("hood");
  const [type, setType] = useState<"all" | "offer" | "request">("all");

  const hoodPosts = useMemo(
    () => posts.filter((p) => p.neighborhoodId === currentUser.neighborhoodId),
    [],
  );
  const publicPosts = useMemo(() => posts.filter((p) => p.visibility === "public"), []);
  const list = (feed === "hood" ? hoodPosts : publicPosts).filter(
    (p) => type === "all" || p.type === type,
  );

  return (
    <AppShell right={<RightRail />}>
      <h1 className="sr-only">منصة مقايضة الخدمات والسلع في قطاع غزة</h1>

      <Card className="gradient-primary mb-5 overflow-hidden rounded-3xl border-0 p-5 text-primary-foreground shadow-glow sm:p-7">
        <Badge className="mb-3 rounded-full bg-primary-foreground/15 text-primary-foreground">
          <Sparkles className="me-1 size-3" /> بدون نقود · بالمقايضة فقط
        </Badge>
        <h2 className="font-display text-xl font-extrabold sm:text-3xl">
          بدّل ما تملكه بما تحتاجه داخل حيّك
        </h2>
        <p className="mt-2 max-w-xl text-sm text-primary-foreground/85 sm:text-base">
          اعرض خدمة أو سلعة، واستلم مقابلها ما تحتاجه من جيرانك في {hood.name} أو من أي حي آخر في
          القطاع.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="soft" className="rounded-full">
            <Link to="/create-post">
              <PlusCircle className="size-4" /> أنشئ منشور مقايضة
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/map">استعرض الخريطة</Link>
          </Button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { k: "منشور نشط", v: "5,312" },
            { k: "مقايضة مكتملة", v: "3,184" },
            { k: "حي مشارك", v: "13" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-primary-foreground/10 p-2.5">
              <p className="font-display text-lg font-bold sm:text-xl">{s.v}</p>
              <p className="text-[11px] text-primary-foreground/80">{s.k}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="glass mb-4 flex flex-col gap-3 rounded-3xl p-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={feed} onValueChange={(v) => setFeed(v as FeedKey)}>
          <TabsList className="grid w-full grid-cols-2 rounded-full sm:w-auto">
            <TabsTrigger value="hood" className="gap-1.5 rounded-full">
              <HomeIcon className="size-4" /> حيّي ({hood.name})
            </TabsTrigger>
            <TabsTrigger value="public" className="gap-1.5 rounded-full">
              <Globe2 className="size-4" /> كل الأحياء
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { k: "all", l: "الكل" },
              { k: "offer", l: "عروض" },
              { k: "request", l: "طلبات" },
            ] as const
          ).map((t) => (
            <Button
              key={t.k}
              size="sm"
              variant={type === t.k ? "hero" : "secondary"}
              className="rounded-full"
              onClick={() => setType(t.k)}
            >
              {t.l}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <Link
            key={c.id}
            to="/search"
            search={{ cat: c.id }}
            className="glass hover-lift shrink-0 rounded-2xl px-3 py-2 text-xs font-medium"
          >
            <span className="me-1">{c.icon}</span>
            {c.name}
          </Link>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="px-1 font-display text-lg font-bold">
          {feed === "hood" ? `منشورات حي ${hood.name}` : "منشورات عامة من كل الأحياء"}
        </h2>
        {list.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
        {list.length === 0 && (
          <Card className="rounded-3xl p-8 text-center text-sm text-muted-foreground">
            لا توجد منشورات مطابقة حالياً.
          </Card>
        )}
      </section>
    </AppShell>
  );
}

function RightRail() {
  const trending = posts.slice(0, 4);
  return (
    <div className="space-y-4">
      <Card className="rounded-3xl border-border/60 bg-card/80 p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold">
          <Flame className="size-4 text-primary" /> الأكثر تفاعلاً
        </p>
        <ul className="space-y-3">
          {trending.map((p) => {
            const u = getUser(p.userId);
            return (
              <li key={p.id} className="flex items-start gap-2">
                <Avatar className="size-8">
                  <AvatarImage src={u.avatar} alt={u.name} />
                  <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold">{p.title}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {getNeighborhood(p.neighborhoodId).name} · {p.likes} إعجاب
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="rounded-3xl border-border/60 bg-card/80 p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold">
          <TrendingUp className="size-4 text-primary" /> أحياء نشطة
        </p>
        <ul className="space-y-2">
          {neighborhoods.slice(0, 6).map((n) => (
            <li key={n.id} className="flex items-center justify-between text-xs">
              <span>{n.name}</span>
              <Badge variant="secondary" className="rounded-full text-[10px]">
                {n.posts} منشور
              </Badge>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="rounded-3xl border-primary/20 bg-primary-soft/50 p-4 text-xs text-primary">
        كل البيانات في هذه النسخة تجريبية لأغراض العرض فقط.
      </Card>
    </div>
  );
}
