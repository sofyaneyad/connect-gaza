import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Star, BadgeCheck, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PostCard } from "@/components/post/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNeighborhood, getUser, posts, users } from "@/data/mock";

export const Route = createFileRoute("/profile/$userId")({
  head: () => ({
    meta: [
      { title: "الملف الشخصي — مقايضة غزة" },
      {
        name: "description",
        content: "ملف مستخدم في منصة مقايضة غزة: الحي، التقييم، الخدمات والسلع والمقايضات المكتملة.",
      },
      { property: "og:title", content: "الملف الشخصي — مقايضة غزة" },
      { property: "og:description", content: "تعرّف على الجار قبل المقايضة: تقييمات وخدمات وسلع." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { userId } = Route.useParams();
  const user = getUser(userId);
  const hood = getNeighborhood(user.neighborhoodId);
  const userPosts = posts.filter((p) => p.userId === user.id);
  const reviewers = users.filter((u) => u.id !== user.id).slice(0, 3);

  return (
    <AppShell crumbs={[{ label: user.name }]}>
      <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/80 p-0">
        <img src={user.cover} alt="" className="h-36 w-full object-cover sm:h-52" />
        <div className="-mt-12 flex flex-col gap-3 p-4 sm:-mt-14 sm:flex-row sm:items-end">
          <Avatar className="size-24 border-4 border-card sm:size-28">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-1.5 font-display text-xl font-bold sm:text-2xl">
              {user.name}
              {user.verified && <BadgeCheck className="size-5 text-primary" />}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.bio}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="secondary" className="rounded-full bg-primary-soft text-primary">
                <MapPin className="me-1 size-3" /> {hood.name}
              </Badge>
              <Badge variant="secondary" className="rounded-full">
                <Star className="me-1 size-3 fill-current text-warning" /> {user.rating} (
                {user.reviews} تقييم)
              </Badge>
              <span className="text-muted-foreground">انضم {user.joined}</span>
            </div>
          </div>
          <Button variant="hero" className="rounded-full">
            <MessageCircle className="size-4" /> مراسلة
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-border/60 p-3 text-center">
          {[
            { k: "منشور", v: userPosts.length },
            { k: "مقايضة مكتملة", v: user.completedBarters },
            { k: "تقييم", v: user.reviews },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl bg-secondary p-2.5">
              <p className="font-display text-lg font-bold">{s.v}</p>
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="posts" className="mt-4">
        <TabsList className="grid w-full grid-cols-4 rounded-full">
          <TabsTrigger value="posts" className="rounded-full">
            المنشورات
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-full">
            خدماته
          </TabsTrigger>
          <TabsTrigger value="goods" className="rounded-full">
            سلعه
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-full">
            التقييمات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-4 space-y-4">
          {userPosts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {userPosts.length === 0 && (
            <Card className="rounded-3xl p-8 text-center text-sm text-muted-foreground">
              لا منشورات بعد.
            </Card>
          )}
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <Card className="flex flex-wrap gap-2 rounded-3xl border-border/60 bg-card/80 p-5">
            {user.services.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-full py-1.5">
                {s}
              </Badge>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="goods" className="mt-4">
          <Card className="flex flex-wrap gap-2 rounded-3xl border-border/60 bg-card/80 p-5">
            {user.goods.map((g) => (
              <Badge key={g} variant="secondary" className="rounded-full py-1.5">
                {g}
              </Badge>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-4 space-y-3">
          {reviewers.map((r, i) => (
            <Card key={r.id} className="flex items-start gap-3 rounded-3xl border-border/60 bg-card/80 p-4">
              <Avatar className="size-10">
                <AvatarImage src={r.avatar} alt={r.name} />
                <AvatarFallback>{r.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="flex gap-0.5 text-warning">
                  {Array.from({ length: 5 - i === 5 ? 5 : 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-current" />
                  ))}
                </p>
                <p className="mt-1 text-sm text-foreground/80">
                  {i === 0
                    ? "مقايضة سريعة ومحترمة، الالتزام بالموعد كان ممتازاً."
                    : i === 1
                      ? "تعامل راقٍ وجودة الخدمة عالية، أنصح بالتبادل معه."
                      : "ساعدني وقت الحاجة وكان كريماً في الاتفاق."}
                </p>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
