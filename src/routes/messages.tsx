import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCheck, ImagePlus, MapPin, Send } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  conversations as seed,
  getNeighborhood,
  getUser,
  type Conversation,
  type Message,
} from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "المحادثات — مقايضة غزة" },
      {
        name: "description",
        content: "محادثات فورية بأسلوب ماسنجر لتنسيق تفاصيل المقايضة مع الجيران.",
      },
      { property: "og:title", content: "المحادثات — مقايضة غزة" },
      { property: "og:description", content: "نسّق موعد ومكان المقايضة عبر المحادثة." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [convos, setConvos] = useState<Conversation[]>(seed);
  const [activeId, setActiveId] = useState<string>(seed[0]!.id);
  const [draft, setDraft] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const active = convos.find((c) => c.id === activeId)!;
  const peer = getUser(active.userId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active.messages.length, activeId]);

  const push = (msg: Omit<Message, "id">) => {
    setConvos((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              lastMessage: msg.kind === "text" ? msg.body : "مرفق",
              messages: [...c.messages, { ...msg, id: `m${Date.now()}` }],
            }
          : c,
      ),
    );
  };

  return (
    <AppShell crumbs={[{ label: "المحادثات" }]}>
      <h1 className="mb-4 font-display text-2xl font-bold">المحادثات</h1>
      <Card className="grid overflow-hidden rounded-3xl border-border/60 bg-card/80 p-0 md:grid-cols-[300px_1fr]">
        <div className={cn("border-e border-border/60", mobileOpen && "hidden md:block")}>
          <div className="p-3">
            <Input placeholder="ابحث في المحادثات…" className="h-10 rounded-full bg-secondary" />
          </div>
          <ul className="max-h-[60vh] overflow-y-auto md:max-h-[65vh]">
            {convos.map((c) => {
              const u = getUser(c.userId);
              return (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setActiveId(c.id);
                      setMobileOpen(true);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 p-3 text-start transition-colors hover:bg-secondary",
                      c.id === activeId && "bg-primary-soft/50",
                    )}
                  >
                    <div className="relative shrink-0">
                      <Avatar className="size-11">
                        <AvatarImage src={u.avatar} alt={u.name} />
                        <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      {c.online && (
                        <span className="absolute -bottom-0.5 -end-0.5 size-3 rounded-full border-2 border-card bg-success" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{u.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.typing ? "يكتب الآن…" : c.lastMessage}
                      </p>
                    </div>
                    <div className="shrink-0 text-end">
                      <p className="text-[10px] text-muted-foreground">{c.time}</p>
                      {c.unread > 0 && (
                        <Badge variant="destructive" className="mt-1 rounded-full px-1.5 text-[10px]">
                          {c.unread}
                        </Badge>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={cn("flex flex-col", !mobileOpen && "hidden md:flex")}>
          <div className="flex items-center gap-3 border-b border-border/60 p-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="رجوع"
              onClick={() => setMobileOpen(false)}
            >
              <ArrowRight className="size-5" />
            </Button>
            <Avatar className="size-10">
              <AvatarImage src={peer.avatar} alt={peer.name} />
              <AvatarFallback>{peer.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{peer.name}</p>
              <p className="text-[11px] text-muted-foreground">
                {getNeighborhood(peer.neighborhoodId).name} ·{" "}
                {active.online ? "متصل الآن" : "غير متصل"}
              </p>
            </div>
          </div>

          <div className="min-h-[45vh] flex-1 space-y-2 overflow-y-auto bg-secondary/40 p-3">
            {active.messages.map((m) => (
              <Bubble key={m.id} message={m} avatar={peer.avatar} />
            ))}
            {active.typing && (
              <div className="flex items-center gap-1 ps-1">
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:120ms]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:240ms]" />
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            className="flex items-center gap-2 border-t border-border/60 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              push({ from: "me", kind: "text", body: draft.trim(), time: "الآن", read: false });
              setDraft("");
            }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="إرسال صورة"
              onClick={() =>
                push({
                  from: "me",
                  kind: "image",
                  body: `https://picsum.photos/seed/msg${Date.now()}/600/400`,
                  time: "الآن",
                  read: false,
                })
              }
            >
              <ImagePlus className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="إرسال موقع"
              onClick={() =>
                push({ from: "me", kind: "location", body: "موقعي الحالي", time: "الآن", read: false })
              }
            >
              <MapPin className="size-4" />
            </Button>
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="اكتب رسالة…"
              className="h-10 rounded-full bg-secondary"
            />
            <Button type="submit" variant="hero" size="icon" className="rounded-full" aria-label="إرسال">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </Card>
    </AppShell>
  );
}

function Bubble({ message, avatar }: { message: Message; avatar: string }) {
  const mine = message.from === "me";
  return (
    <div className={cn("flex items-end gap-2", mine ? "justify-end" : "justify-start")}>
      {!mine && (
        <Avatar className="size-7 shrink-0">
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>..</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-soft",
          mine
            ? "gradient-primary rounded-ee-sm text-primary-foreground"
            : "rounded-es-sm bg-card text-card-foreground",
        )}
      >
        {message.kind === "text" && <p className="leading-relaxed">{message.body}</p>}
        {message.kind === "image" && (
          <img
            src={message.body}
            alt="صورة مرسلة"
            loading="lazy"
            className="h-40 w-56 rounded-xl object-cover"
          />
        )}
        {message.kind === "location" && (
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" /> {message.body}
          </span>
        )}
        <span
          className={cn(
            "mt-1 flex items-center justify-end gap-1 text-[10px]",
            mine ? "text-primary-foreground/75" : "text-muted-foreground",
          )}
        >
          {message.time}
          {mine && <CheckCheck className={cn("size-3", message.read && "text-info-foreground")} />}
        </span>
      </div>
    </div>
  );
}
