import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, getNeighborhood, neighborhoods, posts, users } from "@/data/mock";

const searchSchema = z.object({
  q: z.string().optional(),
  hood: z.string().optional(),
  cat: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "بحث وتصفية المقايضات — مقايضة غزة" },
      {
        name: "description",
        content: "ابحث في الخدمات والسلع والمستخدمين والأحياء والوسوم، وصفِّ النتائج حسب القرب والشعبية.",
      },
      { property: "og:title", content: "بحث وتصفية المقايضات — مقايضة غزة" },
      { property: "og:description", content: "ابحث عن الخدمة أو السلعة التي تحتاجها في أقرب حي." },
    ],
  }),
  component: SearchPage,
});

type Sort = "newest" | "nearest" | "popular";

function SearchPage() {
  const params = Route.useSearch();
  const [q, setQ] = useState(params.q ?? "");
  const [hood, setHood] = useState(params.hood ?? "all");
  const [cat, setCat] = useState(params.cat ?? "all");
  const [kind, setKind] = useState<"all" | "service" | "good">("all");
  const [sort, setSort] = useState<Sort>("newest");

  const results = useMemo(() => {
    const term = q.trim();
    let list = posts.filter((p) => {
      const catObj = categories.find((c) => c.id === p.categoryId);
      const matchTerm =
        !term ||
        [p.title, p.description, ...p.tags, ...p.offerItems, ...p.wantedItems, getNeighborhood(p.neighborhoodId).name]
          .join(" ")
          .includes(term);
      const matchHood = hood === "all" || p.neighborhoodId === hood;
      const matchCat = cat === "all" || p.categoryId === cat;
      const matchKind = kind === "all" || catObj?.kind === kind;
      return matchTerm && matchHood && matchCat && matchKind;
    });
    if (sort === "nearest") list = [...list].sort((a, b) => a.distanceKm - b.distanceKm);
    if (sort === "popular") list = [...list].sort((a, b) => b.likes - a.likes);
    return list;
  }, [q, hood, cat, kind, sort]);

  const matchedUsers = useMemo(
    () => (q.trim() ? users.filter((u) => u.name.includes(q.trim()) || u.bio.includes(q.trim())) : []),
    [q],
  );

  return (
    <AppShell crumbs={[{ label: "البحث" }]}>
      <h1 className="mb-4 font-display text-2xl font-bold">البحث والتصفية</h1>

      <Card className="mb-4 space-y-4 rounded-3xl border-border/60 bg-card/80 p-4 sm:p-5">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن سلعة، خدمة، مستخدم، حي أو وسم…"
            className="h-12 rounded-2xl pe-10 text-base"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-xs">الحي</Label>
            <Select value={hood} onValueChange={setHood}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الأحياء</SelectItem>
                {neighborhoods.map((n) => (
                  <SelectItem key={n.id} value={n.id}>
                    {n.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">التصنيف</Label>
            <Select value={cat} onValueChange={setCat}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل التصنيفات</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">الترتيب</Label>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="nearest">الأقرب</SelectItem>
                <SelectItem value="popular">الأكثر شعبية</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <SlidersHorizontal className="size-3.5" /> النوع:
          </span>
          {(
            [
              { k: "all", l: "الكل" },
              { k: "service", l: "خدمات" },
              { k: "good", l: "سلع" },
            ] as const
          ).map((t) => (
            <Button
              key={t.k}
              size="sm"
              variant={kind === t.k ? "hero" : "secondary"}
              className="rounded-full"
              onClick={() => setKind(t.k)}
            >
              {t.l}
            </Button>
          ))}
          <Badge variant="secondary" className="ms-auto rounded-full">
            {results.length} نتيجة
          </Badge>
        </div>
      </Card>

      {matchedUsers.length > 0 && (
        <Card className="mb-4 rounded-3xl border-border/60 bg-card/80 p-4">
          <p className="mb-3 text-sm font-bold">مستخدمون</p>
          <div className="flex flex-wrap gap-3">
            {matchedUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-2 rounded-2xl bg-secondary p-2">
                <Avatar className="size-9">
                  <AvatarImage src={u.avatar} alt={u.name} />
                  <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-muted-foreground">{getNeighborhood(u.neighborhoodId).name}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {results.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
        {results.length === 0 && (
          <Card className="rounded-3xl p-10 text-center text-sm text-muted-foreground">
            لا توجد نتائج مطابقة. جرّب كلمات أو فلاتر أخرى.
          </Card>
        )}
      </div>
    </AppShell>
  );
}
