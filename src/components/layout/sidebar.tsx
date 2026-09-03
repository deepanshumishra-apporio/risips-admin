'use client';

import { ChevronDown, Clock, LogOut, PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { HomeItem, NavSections, RecentItems } from '@/components/layout/nav-items';
import { cn } from '@/utils/cn';

const ItemClass =
  'flex items-center gap-2.5 rounded-md px-2.5 py-[7px] text-[13.5px] transition-colors';

export function Sidebar(): React.JSX.Element {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [recentsOpen, setRecentsOpen] = useState(true);

  const isActive = (href: string): boolean => pathname === href || pathname.startsWith(`${href}/`);

  const toggleSection = (title: string): void => {
    setCollapsedSections((current) =>
      current.includes(title) ? current.filter((entry) => entry !== title) : [...current, title],
    );
  };

  return (
    <aside className="sticky top-[var(--shell-header)] hidden h-[calc(100vh-var(--shell-header))] w-[var(--shell-sidebar)] shrink-0 flex-col border-r border-line bg-surface lg:flex">
      <div className="p-3">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-md border border-line-strong bg-surface-sunken px-2.5 py-2 text-left text-[13px] text-ink-muted transition-colors hover:border-line-strong hover:bg-surface"
        >
          <Search className="size-4 shrink-0" />
          <span className="flex-1">Quick search...</span>
          <kbd className="rounded border border-line-strong bg-surface px-1.5 py-0.5 text-[10.5px] font-medium text-ink-muted">
            Ctrl K
          </kbd>
        </button>
      </div>

      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
        <Link
          href={HomeItem.href}
          className={cn(
            ItemClass,
            'mb-1 font-medium',
            isActive(HomeItem.href) ? 'bg-brand-soft text-brand-deep' : 'text-ink hover:bg-surface-sunken',
          )}
        >
          <HomeItem.icon className="size-4 shrink-0" strokeWidth={1.9} />
          {HomeItem.label}
        </Link>

        <div className="mb-1">
          <button
            type="button"
            onClick={() => setRecentsOpen((open) => !open)}
            className={cn(ItemClass, 'w-full text-ink hover:bg-surface-sunken')}
          >
            <Clock className="size-4 shrink-0" strokeWidth={1.9} />
            <span className="flex-1 text-left font-medium">Recents</span>
            <ChevronDown className={cn('size-4 text-ink-muted transition-transform', !recentsOpen && '-rotate-90')} />
          </button>

          {recentsOpen ? (
            <ul className="mt-0.5 space-y-0.5 pl-3">
              {RecentItems.map((recent) => (
                <li key={recent.href}>
                  <Link
                    href={recent.href}
                    className="block rounded-md px-2.5 py-1.5 transition-colors hover:bg-surface-sunken"
                  >
                    <span className="block truncate text-[13px] text-ink">{recent.label}</span>
                    <span className="block truncate text-[11.5px] text-ink-muted">{recent.caption}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {NavSections.map((section) => {
          const collapsed = collapsedSections.includes(section.title);

          return (
            <div key={section.title} className="mt-4">
              <button
                type="button"
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between px-2.5 py-1 text-[11px] font-semibold tracking-[0.06em] text-ink-muted uppercase"
              >
                {section.title}
                <ChevronDown className={cn('size-3.5 transition-transform', collapsed && '-rotate-90')} />
              </button>

              {collapsed ? null : (
                <ul className="mt-0.5 space-y-0.5">
                  {section.items.map((item) => {
                    const active = isActive(item.href);

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            ItemClass,
                            active
                              ? 'bg-brand-soft font-medium text-brand-deep'
                              : 'text-ink-soft hover:bg-surface-sunken hover:text-ink',
                          )}
                        >
                          <item.icon
                            className={cn('size-4 shrink-0', active ? 'text-brand' : 'text-ink-muted')}
                            strokeWidth={1.9}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.badge ? (
                            <span className="tabular rounded-full bg-danger-soft px-1.5 py-0.5 text-[11px] font-semibold text-danger">
                              {item.badge}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="flex items-center justify-between border-t border-line p-2.5">
        <button
          type="button"
          aria-label="Collapse sidebar"
          className="rounded-md p-1.5 text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
        >
          <PanelLeft className="size-4" strokeWidth={1.9} />
        </button>

        <Link
          href="/signin"
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
        >
          <LogOut className="size-3.5" strokeWidth={1.9} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
