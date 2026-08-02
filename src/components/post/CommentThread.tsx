import { useMemo, useState } from "react";
import { Heart, ImagePlus, Pencil, Reply, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { comments as seedComments, currentUser, getUser, type Comment } from "@/data/mock";

let seq = 1000;

export function CommentThread({ postId }: { postId: string }) {
  const [items, setItems] = useState<Comment[]>(() =>
    seedComments.filter((c) => c.postId === postId),
  );
  const [draft, setDraft] = useState("");

  const roots = useMemo(() => items.filter((c) => c.parentId === null), [items]);

  const add = (parentId: string | null, body: string) => {
    if (!body.trim()) return;
    seq += 1;
    setItems((prev) => [
      ...prev,
      {
        id: `c${seq}`,
        postId,
        userId: currentUser.id,
        parentId,
        body,
        createdAt: "الآن",
        likes: 0,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          add(null, draft);
          setDraft("");
        }}
      >
        <Avatar className="size-8 shrink-0">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>أنا</AvatarFallback>
        </Avatar>
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="اكتب تعليقاً…"
          className="h-10 rounded-full bg-card"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="إضافة صورة"
          onClick={() => toast.success("إرفاق صورة (تجريبي)")}
        >
          <ImagePlus className="size-4" />
        </Button>
        <Button type="submit" variant="hero" size="icon" className="rounded-full" aria-label="إرسال">
          <Send className="size-4" />
        </Button>
      </form>

      <ul className="space-y-3">
        {roots.map((c) => (
          <CommentNode
            key={c.id}
            comment={c}
            all={items}
            depth={0}
            onReply={add}
            onDelete={(id) =>
              setItems((prev) => prev.filter((x) => x.id !== id && x.parentId !== id))
            }
            onEdit={(id, body) =>
              setItems((prev) => prev.map((x) => (x.id === id ? { ...x, body } : x)))
            }
          />
        ))}
      </ul>
    </div>
  );
}

function CommentNode({
  comment,
  all,
  depth,
  onReply,
  onDelete,
  onEdit,
}: {
  comment: Comment;
  all: Comment[];
  depth: number;
  onReply: (parentId: string, body: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, body: string) => void;
}) {
  const user = getUser(comment.userId);
  const children = all.filter((c) => c.parentId === comment.id);
  const [replying, setReplying] = useState(false);
  const [replyDraft, setReplyDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(comment.body);
  const [liked, setLiked] = useState(false);
  const mine = comment.userId === currentUser.id;

  return (
    <li>
      <div className="flex items-start gap-2">
        <Avatar className="size-8 shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl rounded-ss-sm bg-card p-3 shadow-soft">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{user.name}</span>
              <span className="text-[11px] text-muted-foreground">{comment.createdAt}</span>
            </div>
            {editing ? (
              <form
                className="mt-1.5 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onEdit(comment.id, editDraft);
                  setEditing(false);
                }}
              >
                <Input value={editDraft} onChange={(e) => setEditDraft(e.target.value)} className="h-9" />
                <Button type="submit" size="sm" variant="hero" className="rounded-full">
                  حفظ
                </Button>
              </form>
            ) : (
              <p className="mt-1 text-sm leading-relaxed text-foreground/85">{comment.body}</p>
            )}
            {comment.image && (
              <img
                src={comment.image}
                alt="مرفق التعليق"
                loading="lazy"
                className="mt-2 h-36 w-full max-w-xs rounded-xl object-cover"
              />
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-1 ps-2 text-[11px]">
            <button
              onClick={() => setLiked((v) => !v)}
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-secondary ${liked ? "text-primary" : "text-muted-foreground"}`}
            >
              <Heart className={`size-3 ${liked ? "fill-current" : ""}`} />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setReplying((v) => !v)}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-muted-foreground hover:bg-secondary"
            >
              <Reply className="size-3" /> رد
            </button>
            {mine && (
              <>
                <button
                  onClick={() => setEditing((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-muted-foreground hover:bg-secondary"
                >
                  <Pencil className="size-3" /> تعديل
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-3" /> حذف
                </button>
              </>
            )}
          </div>

          {replying && (
            <form
              className="mt-2 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                onReply(comment.id, replyDraft);
                setReplyDraft("");
                setReplying(false);
              }}
            >
              <Input
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder={`رد على ${user.name}…`}
                className="h-9 rounded-full bg-card"
              />
              <Button type="submit" size="sm" variant="hero" className="rounded-full">
                رد
              </Button>
            </form>
          )}

          {children.length > 0 && (
            <ul
              className={`mt-3 space-y-3 border-s border-border ps-3 ${depth >= 2 ? "ms-0" : "ms-1"}`}
            >
              {children.map((c) => (
                <CommentNode
                  key={c.id}
                  comment={c}
                  all={all}
                  depth={depth + 1}
                  onReply={onReply}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
