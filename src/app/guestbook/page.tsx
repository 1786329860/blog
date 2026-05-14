"use client";

import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface GuestbookEntry {
  id: string;
  content: string;
  authorName: string;
  authorEmail?: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatar?: string | null;
  } | null;
}

interface GuestbookResponse {
  guestbooks: GuestbookEntry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function GuestbookPage() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  const fetchEntries = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/guestbook?page=${pageNum}&limit=10`);
      if (!res.ok) throw new Error("获取留言失败");
      const data: GuestbookResponse = await res.json();
      if (pageNum === 1) {
        setEntries(data.guestbooks);
      } else {
        setEntries((prev) => [...prev, ...data.guestbooks]);
      }
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error("获取留言失败:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries(1);
  }, [fetchEntries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const body: Record<string, string> = { content };
      if (!session?.user?.id) {
        body.authorName = authorName.trim();
        body.authorEmail = authorEmail.trim();
      }

      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: "提交失败" }));
        alert(errData.error || "提交失败");
        return;
      }

      setContent("");
      setAuthorName("");
      setAuthorEmail("");
      setPage(1);
      await fetchEntries(1);
    } catch (err) {
      console.error("提交失败:", err);
      alert("网络错误，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mx-container py-12">
      <SectionHeading eyebrow="Guestbook" title="留言板" icon="user" />

      <div className="mx-auto mt-8 max-w-3xl space-y-6">
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6">
          <p className="mb-4 text-sm font-semibold text-ink-soft/80">
            {session?.user
              ? `以 ${session.user.name || "用户"} 身份留言`
              : "游客留言（可匿名）"}
          </p>

          {!session?.user && (
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-azure-700">
                  昵称 *
                </label>
                <input
                  id="name"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="你的昵称"
                  required={!session?.user}
                  className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-azure-400 focus:bg-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-azure-700">
                  邮箱（选填）
                </label>
                <input
                  id="email"
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/60 bg-white/70 px-4 py-2.5 text-sm text-ink outline-none transition focus:border-azure-400 focus:bg-white"
                />
              </div>
            </div>
          )}

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你想说的话..."
            rows={4}
            maxLength={500}
            className="mb-3 w-full resize-y rounded-xl border border-white/60 bg-white/70 px-4 py-3 text-sm leading-relaxed text-ink outline-none transition placeholder:text-ink-soft/40 focus:border-azure-400 focus:bg-white"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-ink-soft/50">{content.length}/500</span>
            <button
              type="submit"
              disabled={submitting || !content.trim() || (!session?.user && !authorName.trim())}
              className="primary-button cursor-pointer disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Icon name="paperPlane" className="h-4 w-4" />
              {submitting ? "发送中..." : "发送留言"}
            </button>
          </div>
        </form>

        <div className="relative space-y-0">
          {entries.length === 0 && !loading ? (
            <div className="glass-panel rounded-2xl p-10 text-center">
              <Icon name="mail" className="mx-auto mb-3 h-10 w-10 text-azure-300" />
              <p className="font-semibold text-ink-soft">还没有留言</p>
              <p className="mt-1 text-sm text-ink-soft/60">来留下第一条吧 ✨</p>
            </div>
          ) : (
            entries.map((entry, idx) => (
              <div key={entry.id} className="relative pl-8">
                {idx !== entries.length - 1 && (
                  <div className="absolute left-[11px] top-8 h-full w-0.5 bg-gradient-to-b from-azure-200 to-transparent" />
                )}
                <div className="absolute left-0 top-1 h-[22px] w-[22px] rounded-full border-2 border-azure-400 bg-white shadow-sm" />

                <div className="glass-panel rounded-xl p-5 transition hover:-translate-y-0.5">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-azure-100 to-azure-200 text-sm font-black text-azure-700 shadow-inner">
                      {entry.user?.avatar ? (
                        <img src={entry.user.avatar} alt="" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        entry.authorName.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{entry.authorName}</p>
                      <p className="text-xs text-ink-soft/50">{formatDate(entry.createdAt)}</p>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{entry.content}</p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="glass-panel rounded-xl p-6 text-center text-sm text-ink-soft/60">加载中...</div>
          )}

          {page < totalPages && !loading && (
            <button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchEntries(nextPage);
              }}
              className="mx-auto mt-4 flex link-button cursor-pointer"
            >
              加载更多
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
