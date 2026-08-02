import { useState } from "react";
import { ArrowLeftRight, Send } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { getUser, type Post } from "@/data/mock";

export function BarterModal({
  post,
  open,
  onOpenChange,
}: {
  post: Post;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const user = getUser(post.userId);
  const [offer, setOffer] = useState("");
  const [need, setNeed] = useState(post.offerItems[0] ?? "");
  const [message, setMessage] = useState("");

  const send = () => {
    if (!offer.trim()) {
      toast.error("اكتب ما ستقدّمه في المقايضة");
      return;
    }
    onOpenChange(false);
    setOffer("");
    setMessage("");
    toast.success(`تم إرسال طلب المقايضة إلى ${user.name} (تجريبي)`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowLeftRight className="size-5 text-primary" /> طلب مقايضة
          </DialogTitle>
          <DialogDescription>
            مع {user.name} · {post.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-2xl bg-primary-soft/50 p-3">
            <p className="mb-1.5 text-xs font-semibold text-primary">ما يعرضه الطرف الآخر</p>
            <div className="flex flex-wrap gap-1.5">
              {post.offerItems.map((i) => (
                <Badge key={i} variant="secondary" className="rounded-full text-[11px]">
                  {i}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="barter-offer">ماذا ستقدّم؟</Label>
            <Input
              id="barter-offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="مثال: 5 كيلو طحين + كيلو سكر"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="barter-need">ماذا تحتاج؟</Label>
            <Input
              id="barter-need"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder="مثال: شحن هاتف يومياً لأسبوع"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="barter-msg">رسالة</Label>
            <Textarea
              id="barter-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="اكتب تفاصيل الوقت والمكان المناسب للتبادل…"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-start">
          <Button variant="hero" onClick={send} className="rounded-full">
            <Send className="size-4" /> إرسال الطلب
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-full">
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
