import type { PageTab } from '@/components/ui/page-tabs';

/** Agents and sub-admins are two views of the same people directory. */
export const TeamTabs: PageTab[] = [
  { label: 'Agents', href: '/agents' },
  { label: 'Sub-admins', href: '/sub-admins' },
];
