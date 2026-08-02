import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Menu, MessageCircle, Search, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { currentUser, getNeighborhood } from "@/data/mock";
import { SidebarNav } from "./Sidebar";

export function Navbar() {
  const [query, setQuery] = useState("");
  const hood = getNeighborhood(currentUser.neighborhoodId);

  return (
    <header className="glass sticky top-0 z-40 border-b border-border/60">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center gap-2 px-3 sm:gap-3 sm:px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="القائمة">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] p-0">
            <div className="h-full overflow-y-auto p-4 pt-12">
              <SidebarNav />
            </div>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="gradient-primary grid size-9 place-items-center rounded-xl text-primary-foreground shadow-glow">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 8h11l-3-3M20 16H9l3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-bold">مقايضة غزة</span>
            <span className="text-[11px] text-muted-foreground">خدمات وسلع بلا نقود</span>
          </span>
        </Link>

        <form
          className="relative mx-auto hidden max-w-md flex-1 md:block"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن خدمة، سلعة، حي أو مستخدم…"
            className="h-10 rounded-full border-transparent bg-secondary pe-10"
          />
        </form>

        <div className="ms-auto flex items-center gap-1 sm:gap-1.5">
          <Button asChild variant="ghost" size="icon" className="md:hidden" aria-label="البحث">
            <Link to="/search">
              <Search className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="الخريطة">
            <Link to="/map">
              <MapPin className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="الرسائل">
            <Link to="/messages">
              <MessageCircle className="size-5" />
              <span className="absolute end-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="الإشعارات">
            <Link to="/notifications">
              <Bell className="size-5" />
              <span className="absolute end-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                3
              </span>
            </Link>
          </Button>
          <Button asChild variant="hero" className="hidden rounded-full sm:inline-flex">
            <Link to="/create-post">
              <Plus className="size-4" />
              منشور جديد
            </Link>
          </Button>
          <Link to="/profile/$userId" params={{ userId: currentUser.id }} className="ms-1 shrink-0">
            <Avatar className="size-9 ring-2 ring-primary/25">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <div className="border-t border-border/50 bg-primary-soft/40 py-1 text-center text-[11px] text-primary sm:hidden">
        حيّك: {hood.name} · {hood.members.toLocaleString("ar-EG")} عضو
      </div>
    </header>
  );
}
