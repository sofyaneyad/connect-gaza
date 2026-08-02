import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Flag,
  Repeat2,
  Eye,
  MapPin,
  ArrowLeftRight,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCategory, getNeighborhood, getUser, type Post } from "@/data/mock";
import { BarterModal } from "./BarterModal";
import { CommentThread } from "./CommentThread";
import { cn } from "@/lib/utils";

const statusStyles: Record<Post["status"], string> = {
  متاح: "bg-success/12 text-success border-success/25",
  "قيد التبادل": "bg-warning/15 text-warning-foreground border-warning/30",
  مكتمل: "bg-muted text-muted-foreground border-border",
};

export function PostCard({ post }: { post: Post }) {
  const user = getUser(post.userId);
  const hood = getNeighborhood(post.neighborhoodId);
  const cat = getCategory(post.categoryId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [barterOpen, setBarterOpen] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <Card className="animate-rise overflow-hidden rounded-3xl border-border/60 bg-card/80 p-0 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-start gap-3 p-4">
        <Link to="/profile/$userId" params={{ userId: user.id }}>
          <Avatar className="size-11 ring-2 ring-primary/20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              to="/profile/$userId"
              params={{ userId: user.id }}
              className="truncate text-sm font-semibold hover:underline"
            >
              {user.name}
            </Link>
            <Badge variant="secondary" className="rounded-full bg-primary-soft text-[10px] text-primary">
              <MapPin className="me-0.5 size-3" /> {hood.name}
            </Badge>
            <Badge variant="outline" className={cn("rounded-full text-[10px]", statusStyles[post.status])}>
              {post.status}
            </Badge>
          </div>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> {post.createdAt}
            </span>
            <span>·</span>
            <span>يبعد {post.distanceKm.toLocaleString("ar-EG")} كم</span>
            <span>·</span>
            <span>{post.visibility === "public" ? "عام لكل الأحياء" : "داخل الحي فقط"}</span>
          </p>
        </div>
        <Badge
          className={cn(
            "shrink-0 rounded-full text-[11px]",
            post.type === "offer"
              ? "bg-primary text-primary-foreground"
              : "bg-info text-info-foreground",
          )}
        >
          {post.type === "offer" ? "أقدّم" : "أحتاج"}
        </Badge>
      </div>

      <div className="px-4">
        <h3 className="text-base font-bold sm:text-lg">{post.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">{post.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="rounded-full text-[11px]">
            {cat.icon} {cat.name}
          </Badge>
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
              #{t}
            </span>
          ))}
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <ItemsBox title="المعروض" items={post.offerItems} tone="primary" />
          <ItemsBox title="المطلوب" items={post.wantedItems} tone="info" />
        </div>
      </div>

      {post.images.length > 0 && (
        <div
          className={cn(
            "mt-3 grid gap-1 px-1",
            post.images.length === 1 ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {post.images.slice(0, 3).map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${post.title} - صورة ${i + 1}`}
              loading="lazy"
              className={cn(
                "h-44 w-full rounded-xl object-cover sm:h-56",
                post.images.length === 3 && i === 0 && "col-span-2",
              )}
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 pt-3 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3" /> {post.location}
        </span>
        <span className="inline-flex items-center gap-1">
          <Eye className="size-3" /> {post.views.toLocaleString("ar-EG")} مشاهدة
        </span>
        <span>{likes.toLocaleString("ar-EG")} إعجاب</span>
        <span>{post.comments} تعليق</span>
        <span>{post.shares} مشاركة</span>
      </div>

      <div className="mt-2 flex items-center gap-0.5 border-t border-border/60 p-2">
        <Action
          icon={<Heart className={cn("size-4", liked && "fill-current")} />}
          label="إعجاب"
          active={liked}
          onClick={() => setLiked((v) => !v)}
        />
        <Action
          icon={<MessageSquare className="size-4" />}
          label="تعليق"
          onClick={() => setShowComments((v) => !v)}
        />
        <Action
          icon={<Share2 className="size-4" />}
          label="مشاركة"
          onClick={() => toast.success("تم نسخ رابط المنشور (تجريبي)")}
        />
        <Action
          icon={<Bookmark className={cn("size-4", saved && "fill-current")} />}
          label="حفظ"
          active={saved}
          onClick={() => {
            setSaved((v) => !v);
            toast.success(saved ? "أُزيل من المحفوظات" : "حُفظ المنشور");
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ms-auto shrink-0" aria-label="إبلاغ">
              <Flag className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.success("تم إرسال الإبلاغ للمراجعة")}>
              محتوى مخالف
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("تم إرسال الإبلاغ للمراجعة")}>
              طلب مقابل مالي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("تم إخفاء المنشور")}>
              إخفاء المنشور
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="hero" className="rounded-full" onClick={() => setBarterOpen(true)}>
          <ArrowLeftRight className="size-4" /> قايض الآن
        </Button>
      </div>

      {showComments && (
        <div className="border-t border-border/60 bg-secondary/40 p-4">
          <CommentThread postId={post.id} />
        </div>
      )}

      <BarterModal post={post} open={barterOpen} onOpenChange={setBarterOpen} />
    </Card>
  );
}

function ItemsBox({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "primary" | "info";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-3",
        tone === "primary" ? "border-primary/20 bg-primary-soft/50" : "border-info/20 bg-info/8",
      )}
    >
      <p
        className={cn(
          "mb-1.5 flex items-center gap-1 text-[11px] font-semibold",
          tone === "primary" ? "text-primary" : "text-info",
        )}
      >
        <Repeat2 className="size-3.5" /> {title}
      </p>
      <ul className="space-y-0.5 text-sm">
        {items.map((i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                tone === "primary" ? "bg-primary" : "bg-info",
              )}
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Action({
  icon,
  label,
  onClick,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn("flex-1 gap-1.5 rounded-xl text-xs sm:text-sm", active && "text-primary")}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
}
