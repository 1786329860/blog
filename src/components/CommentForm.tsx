'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Icon } from '@/components/ui/Icon';

type CommentFormProps = {
  postId: string;
};

export function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: content.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setMessage({ type: 'error', text: '请先登录后再发表评论' });
        } else {
          setMessage({ type: 'error', text: data.error || '发表评论失败' });
        }
        return;
      }

      setMessage({ type: 'success', text: '评论发表成功！刷新页面查看' });
      setContent('');
    } catch {
      setMessage({ type: 'error', text: '网络错误，请稍后重试' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <GlassCard className="p-4 sm:p-5">
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment-input" className="mb-3 block text-sm font-bold text-ink">
          发表评论
        </label>
        <textarea
          id="comment-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的想法..."
          rows={4}
          className="focus-ring w-full rounded-xl border border-azure-100 bg-white/60 p-3.5 text-sm leading-relaxed text-ink placeholder:text-ink-soft/40 backdrop-blur-sm transition focus:border-azure-300 focus:bg-white resize-none"
          disabled={isSubmitting}
        />
        <div className="mt-3 flex items-center justify-between gap-3">
          {message && (
            <span
              className={`text-xs font-semibold ${
                message.type === 'success' ? 'text-emerald-600' : 'text-red-500'
              }`}
            >
              {message.text}
            </span>
          )}
          {!message && <span />}
          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="primary-button inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Icon name="sparkle" className="h-4 w-4 animate-pulse" />
                发送中...
              </>
            ) : (
              <>
                <Icon name="paperPlane" className="h-4 w-4" />
                发表评论
              </>
            )}
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
