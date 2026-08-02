import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ImagePlus, MapPin, Plus, Send, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, currentUser, neighborhoods } from "@/data/mock";

export const Route = createFileRoute("/create-post")({
  head: () => ({
    meta: [
      { title: "إنشاء منشور مقايضة — مقايضة غزة" },
      {
        name: "description",
        content: "أنشئ منشور عرض أو طلب: حدّد ما تقدّمه وما تحتاجه، والتصنيف والموقع ونطاق النشر.",
      },
      { property: "og:title", content: "إنشاء منشور مقايضة — مقايضة غزة" },
      { property: "og:description", content: "اعرض خدمتك أو سلعتك واطلب ما تحتاجه بالمقابل." },
    ],
  }),
  component: CreatePostPage,
});

function CreatePostPage() {
  const navigate = useNavigate();
  const [type, setType] = useState<"offer" | "request">("offer");
  const [visibility, setVisibility] = useState<"neighborhood" | "public">("public");
  const [offerItems, setOfferItems] = useState<string[]>(["شحن هاتف كامل"]);
  const [wantedItems, setWantedItems] = useState<string[]>(["طحين"]);
  const [images, setImages] = useState<string[]>([]);

  return (
    <AppShell crumbs={[{ label: "إنشاء منشور" }]}>
      <h1 className="mb-1 font-display text-2xl font-bold">إنشاء منشور مقايضة</h1>
      <p className="mb-5 text-sm text-muted-foreground">
        كل الحقول تجريبية ولا تُرسل إلى أي خادم.
      </p>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("تم نشر منشور المقايضة (تجريبي)");
          navigate({ to: "/" });
        }}
      >
        <Card className="rounded-3xl border-border/60 bg-card/80 p-5">
          <Label className="mb-3 block">نوع المنشور</Label>
          <RadioGroup
            value={type}
            onValueChange={(v) => setType(v as "offer" | "request")}
            className="grid gap-3 sm:grid-cols-2"
          >
            {(
              [
                { v: "offer", t: "أقدّم (عرض)", d: "لدي خدمة أو سلعة أقدّمها مقابل شيء أحتاجه" },
                { v: "request", t: "أحتاج (طلب)", d: "أحتاج خدمة أو سلعة وأعرض مقابلها" },
              ] as const
            ).map((o) => (
              <label
                key={o.v}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                  type === o.v ? "border-primary bg-primary-soft/60" : "border-border hover:bg-secondary"
                }`}
              >
                <RadioGroupItem value={o.v} className="mt-1" />
                <span>
                  <span className="block text-sm font-semibold">{o.t}</span>
                  <span className="block text-xs text-muted-foreground">{o.d}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </Card>

        <Card className="space-y-4 rounded-3xl border-border/60 bg-card/80 p-5">
          <div className="space-y-1.5">
            <Label htmlFor="title">العنوان</Label>
            <Input
              id="title"
              className="h-11 rounded-xl"
              placeholder="مثال: شحن هواتف بالطاقة الشمسية مقابل مواد غذائية"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="desc">الوصف</Label>
            <Textarea
              id="desc"
              rows={5}
              className="rounded-2xl"
              placeholder="اشرح التفاصيل: الأوقات المتاحة، الكمية، الشروط…"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>التصنيف</Label>
              <Select defaultValue="electricity">
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>الحي</Label>
              <Select defaultValue={currentUser.neighborhoodId}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="اختر الحي" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((n) => (
                    <SelectItem key={n.id} value={n.id}>
                      {n.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <ItemsEditor
            title="ما تقدّمه"
            placeholder="مثال: تصليح كشاف ليد"
            items={offerItems}
            setItems={setOfferItems}
          />
          <ItemsEditor
            title="ما تحتاجه"
            placeholder="مثال: كيلو أرز"
            items={wantedItems}
            setItems={setWantedItems}
          />
        </div>

        <Card className="rounded-3xl border-border/60 bg-card/80 p-5">
          <Label className="mb-3 block">الصور</Label>
          <div className="flex flex-wrap gap-2">
            {images.map((src) => (
              <div key={src} className="relative">
                <img src={src} alt="صورة المنشور" className="size-24 rounded-2xl object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((p) => p.filter((i) => i !== src))}
                  className="absolute -end-1 -top-1 grid size-6 place-items-center rounded-full bg-destructive text-destructive-foreground"
                  aria-label="إزالة الصورة"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setImages((p) => [...p, `https://picsum.photos/seed/new${p.length + Date.now()}/400/400`])
              }
              className="grid size-24 place-items-center rounded-2xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ImagePlus className="size-5" />
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">إضافة الصور تجريبية (صور عشوائية).</p>
        </Card>

        <Card className="rounded-3xl border-border/60 bg-card/80 p-5">
          <Label className="mb-3 block">نطاق النشر</Label>
          <RadioGroup
            value={visibility}
            onValueChange={(v) => setVisibility(v as "neighborhood" | "public")}
            className="grid gap-3 sm:grid-cols-2"
          >
            {(
              [
                { v: "neighborhood", t: "داخل الحي فقط", d: "يظهر لجيرانك في نفس الحي" },
                { v: "public", t: "عام", d: "يظهر لكل الأحياء في القطاع" },
              ] as const
            ).map((o) => (
              <label
                key={o.v}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                  visibility === o.v
                    ? "border-primary bg-primary-soft/60"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <RadioGroupItem value={o.v} className="mt-1" />
                <span>
                  <span className="block text-sm font-semibold">{o.t}</span>
                  <span className="block text-xs text-muted-foreground">{o.d}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
          <div className="mt-4 space-y-1.5">
            <Label htmlFor="loc">الموقع التفصيلي</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="loc"
                className="h-11 rounded-xl pe-10"
                placeholder="مثال: شارع الجلاء - قرب المسجد"
              />
            </div>
          </div>
        </Card>

        <div className="flex flex-wrap gap-2 pb-4">
          <Button type="submit" variant="hero" className="h-11 rounded-full px-6">
            <Send className="size-4" /> نشر المنشور
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-11 rounded-full"
            onClick={() => toast.success("تم حفظ المسودة (تجريبي)")}
          >
            حفظ كمسودة
          </Button>
        </div>
      </form>
    </AppShell>
  );
}

function ItemsEditor({
  title,
  placeholder,
  items,
  setItems,
}: {
  title: string;
  placeholder: string;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [draft, setDraft] = useState("");
  return (
    <Card className="rounded-3xl border-border/60 bg-card/80 p-5">
      <Label className="mb-3 block">{title}</Label>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          className="h-10 rounded-xl"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (draft.trim()) setItems((p) => [...p, draft.trim()]);
              setDraft("");
            }
          }}
        />
        <Button
          type="button"
          variant="soft"
          size="icon"
          className="shrink-0 rounded-xl"
          aria-label="إضافة"
          onClick={() => {
            if (draft.trim()) setItems((p) => [...p, draft.trim()]);
            setDraft("");
          }}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((i) => (
          <Badge key={i} variant="secondary" className="gap-1 rounded-full py-1">
            {i}
            <button
              type="button"
              onClick={() => setItems((p) => p.filter((x) => x !== i))}
              aria-label="حذف"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        {items.length === 0 && <p className="text-xs text-muted-foreground">لم تُضف عناصر بعد.</p>}
      </div>
    </Card>
  );
}
