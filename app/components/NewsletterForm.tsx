'use client';

import { useState } from 'react';

type NewsletterMessages = {
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  success: string;
  error: string;
};

export function NewsletterForm({ messages }: { messages: NewsletterMessages }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="sr-only">
        {messages.emailLabel}
      </label>
      <input
        id="email"
        type="email"
        placeholder={messages.emailPlaceholder}
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === 'loading'}
        className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-text placeholder:text-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-70"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-70"
      >
        {status === 'loading' ? '...' : messages.submit}
      </button>
      {status === 'success' && (
        <p className="w-full text-sm text-green-600 dark:text-green-400" role="status">
          {messages.success}
        </p>
      )}
      {status === 'error' && (
        <p className="w-full text-sm text-red-600 dark:text-red-400" role="alert">
          {messages.error}
        </p>
      )}
    </form>
  );
}
