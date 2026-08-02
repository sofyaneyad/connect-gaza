import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Flag, FolderTree, LayoutDashboard, MapPin, Users, FileText, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  adminStats,
  categories,
  getNeighborhood,
  getPost,
  getUser,
  neighborhoods,
  posts,
  reports,
  users,
} from "@/data/mock";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة — مقايضة غزة" },
      {
        name: "description",
        content: "لوحة إدارة تجريبية: إحصائيات، مستخدمون، منشورات، إبلاغات، تصنيفات وأحياء.",
      },
      { property: "og:title", content: "لوحة الإدارة — مقايضة غزة" },
      { property: "og:description", content: "متابعة نشاط المنصة والمحتوى والإبلاغات." },
    ],
  }),
  component: AdminPage,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--primary-glow)"];

function AdminPage() {
  return (
    <AppShell crumbs={[{ label: "لوحة الإدارة" }]} wide>
      <h1 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold">
        <LayoutDashboard className="size-6 text-primary" /> لوحة الإدارة
      </h1>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat icon={Users} label="المستخدمون" value={adminStats.totals.users} />
        <Stat icon={FileText} label="المنشورات" value={adminStats.totals.posts} />
        <Stat icon={TrendingUp} label="المقايضات المكتملة" value={adminStats.totals.barters} />
        <Stat icon={Flag} label="الإبلاغات" value={adminStats.totals.reports} />
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl">
          {[
            ["dashboard", "الرئيسية"],
            ["stats", "الإحصائيات"],
            ["users", "المستخدمون"],
            ["posts", "المنشورات"],
            ["reports", "الإبلاغات"],
            ["categories", "التصنيفات"],
            ["hoods", "الأحياء"],
          ].map(([v, l]) => (
            <TabsTrigger key={v} value={v} className="rounded-xl text-xs sm:text-sm">
              {l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="dashboard" className="mt-4 grid gap-4 lg:grid-cols-2">
          <ChartCard title="النشاط الأسبوعي">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={adminStats.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="posts" name="منشورات" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="barters" name="مقايضات" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="نمو المستخدمين">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={adminStats.growth}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="users" name="مستخدمون" stroke="var(--primary)" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="stats" className="mt-4 grid gap-4 lg:grid-cols-2">
          <ChartCard title="المنشورات حسب التصنيف">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={adminStats.byCategory} dataKey="value" nameKey="name" outerRadius={100} label>
                  {adminStats.byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="أنشط الأحياء">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={neighborhoods.slice(0, 7)} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="posts" name="منشورات" fill="var(--chart-3)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <TableCard>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>الحي</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>مقايضات</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={u.avatar} alt={u.name} />
                      <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {u.name}
                  </TableCell>
                  <TableCell>{getNeighborhood(u.neighborhoodId).name}</TableCell>
                  <TableCell>{u.rating}</TableCell>
                  <TableCell>{u.completedBarters}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full text-[11px]">
                      {u.verified ? "موثّق" : "قيد التوثيق"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableCard>
        </TabsContent>

        <TabsContent value="posts" className="mt-4">
          <TableCard>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>الحي</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>مشاهدات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="max-w-[240px] truncate">{p.title}</TableCell>
                  <TableCell>{p.type === "offer" ? "عرض" : "طلب"}</TableCell>
                  <TableCell>{getNeighborhood(p.neighborhoodId).name}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>{p.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableCard>
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <TableCard>
            <TableHeader>
              <TableRow>
                <TableHead>المنشور</TableHead>
                <TableHead>المُبلِغ</TableHead>
                <TableHead>السبب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الوقت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="max-w-[220px] truncate">
                    {getPost(r.postId)?.title ?? "—"}
                  </TableCell>
                  <TableCell>{getUser(r.reporter).name}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full text-[11px]">
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{r.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableCard>
        </TabsContent>

        <TabsContent value="categories" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.id} className="flex items-center gap-3 rounded-3xl border-border/60 bg-card/80 p-4">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-xl">
                {c.icon}
              </span>
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  {c.kind === "service" ? "خدمة" : "سلعة"} · {c.count} منشور
                </p>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="hoods" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <Card key={n.id} className="rounded-3xl border-border/60 bg-card/80 p-4">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <MapPin className="size-4 text-primary" /> {n.name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{n.city}</p>
              <div className="mt-2 flex gap-2 text-[11px]">
                <Badge variant="secondary" className="rounded-full">
                  {n.members.toLocaleString("ar-EG")} عضو
                </Badge>
                <Badge variant="secondary" className="rounded-full">
                  {n.posts} منشور
                </Badge>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: number;
}) {
  return (
    <Card className="flex items-center gap-3 rounded-3xl border-border/60 bg-card/80 p-4">
      <span className="gradient-primary grid size-11 shrink-0 place-items-center rounded-2xl text-primary-foreground">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="font-display text-xl font-bold">{value.toLocaleString("ar-EG")}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="rounded-3xl border-border/60 bg-card/80 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-bold">
        <FolderTree className="size-4 text-primary" /> {title}
      </p>
      {children}
    </Card>
  );
}

function TableCard({ children }: { children: React.ReactNode }) {
  return (
    <Card className="overflow-x-auto rounded-3xl border-border/60 bg-card/80 p-2">
      <Table>{children}</Table>
    </Card>
  );
}
