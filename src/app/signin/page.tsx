'use client';

import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { BrandLockup } from '@/components/layout/brand-mark';
import { Field, TextInput } from '@/components/ui/field';

const Highlights = [
  'Unified SIP, agent and compliance oversight',
  'Curate and publish model portfolios',
  'Capture review meetings and profile changes',
];

export default function SignInPage(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      <section className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-navy px-12 py-12 text-white lg:flex">
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: 'radial-gradient(110% 80% at 12% 0%, #0160c2 0%, #020b1b 62%)' }}
        />

        <div className="relative">
          <BrandLockup tone="inverse" className="text-white" />
        </div>

        <div className="relative max-w-sm">
          <h1 className="text-[30px] leading-[1.15] font-semibold tracking-[-0.025em]">
            The control room for your distribution book.
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            Sign in to manage investors, agents and the model portfolios that back every recommendation.
          </p>

          <ul className="mt-7 space-y-3">
            {Highlights.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-[13.5px] text-white/75">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-[12px] text-white/35">
          AMFI registered mutual fund distributor. Investments are subject to market risk.
        </p>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 lg:hidden">
            <BrandLockup />
          </div>

          <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">Sign in</h2>
          <p className="mt-1.5 text-[13.5px] text-ink-muted">Use your RiSips admin credentials to continue.</p>

          <form className="mt-7 space-y-4" onSubmit={(event) => event.preventDefault()}>
            <Field label="Work email">
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
                <TextInput type="email" placeholder="you@risips.in" defaultValue="admin@risips.in" className="pl-9" />
              </div>
            </Field>

            <Field label="Password">
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" />
                <TextInput
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  defaultValue="admin-portal"
                  className="pr-10 pl-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-ink-muted hover:text-ink-soft"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-[13px] text-ink-soft">
                <input type="checkbox" defaultChecked className="size-3.5 accent-[var(--color-brand)]" />
                Keep me signed in
              </label>
              <button type="button" className="text-[13px] font-medium text-brand hover:text-brand-deep">
                Forgot password?
              </button>
            </div>

            <Link
              href="/dashboard"
              className="mt-2 flex h-10.5 w-full items-center justify-center gap-2 rounded-md bg-brand text-[14px] font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              Sign in to portal
              <ArrowRight className="size-4" />
            </Link>
          </form>

          <div className="mt-6 rounded-xl border border-line bg-surface px-4 py-3">
            <p className="text-[12.5px] leading-relaxed text-ink-muted">
              Sub-admins and agents sign in here too. What you see afterwards depends on the permissions your super
              admin has granted.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
