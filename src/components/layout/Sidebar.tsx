import { Link } from "@tanstack/react-router";
import {
  Home,
  Compass,
  MapPin,
  MessageCircle,
  Bell,
  PlusCircle,
  User as UserIcon,
  LayoutDashboard,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { categories, currentUser, getNeighborhood, neighborhoods } from "@/data/mock";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/search", label: "استكشاف وبحث", icon: Search },
  { to: "/map", label: "الخريطة", icon: MapPin },
  { to: "/messages", label: "المحادثات", icon: MessageCircle, badge: "3" },
  { to: "/notifications", label: "الإشعارات", icon: Bell, badge: "3" },
  { to: "/create-post", label: "إنشاء منشور", icon: PlusCircle },
  { to: "/admin", label: "لوحة الإدارة", icon: LayoutDashboard },
] as const;

export function SidebarNav() {
  const hood = getNeighborhood(currentUser.neighborhoodId);

  return (
    <nav className="flex flex-col gap-6">
      <Link
        to="/profile/$userId"
        params={{ userId: currentUser.id }}
        className="glass hover-lift flex items-center gap-3 rounded-2xl p-3"
      >
        <Avatar className="size-11 ring-2 ring-primary/25">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{currentUser.name}</p>
          <p className="truncate text-xs text-muted-foreground">حي {hood.name}</p>
        </div>
      </Link>

      <ul className="space-y-1">
        {links.map(({ to, label, icon: Icon, ...rest }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              activeProps={{ className: "bg-primary-soft text-primary font-semibold" }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-secondary",
              )}
            >
              <Icon className="size-[18px]" />
              <span className="flex-1">{label}</span>
              {"badge" in rest && rest.badge ? (
                <Badge variant="destructive" className="rounded-full px-1.5 text-[10px]">
                  {rest.badge}
                </Badge>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <p className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold text-muted-foreground">
          <Compass className="size-3.5" /> الأحياء
        </p>
        <ul className="max-h-64 space-y-0.5 overflow-y-auto pe-1">
          {neighborhoods.map((n) => (
            <li key={n.id}>
              <Link
                to="/search"
                search={{ hood: n.id }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/75 transition-colors hover:bg-secondary"
              >
                <span className="truncate">{n.name}</span>
                <span className="text-[11px] text-muted-foreground">{n.posts}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 px-3 text-xs font-semibold text-muted-foreground">التصنيفات</p>
        <div className="flex flex-wrap gap-1.5 px-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/search"
              search={{ cat: c.id }}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] text-secondary-foreground transition-colors hover:bg-accent"
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </div>
      </div>

      <Link
        to="/profile/$userId"
        params={{ userId: currentUser.id }}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-secondary"
      >
        <UserIcon className="size-4" /> ملفي الشخصي
      </Link>
    </nav>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto pb-8 lg:block no-scrollbar">
      <SidebarNav />
    </aside>
  );
}
