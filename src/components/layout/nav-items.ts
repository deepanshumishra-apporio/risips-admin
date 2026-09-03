import {
  Bot,
  Boxes,
  CalendarCheck,
  Home,
  LayoutDashboard,
  Layers,
  ShieldAlert,
  UserCog,
  Users,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

/** Pinned above the grouped sections, the way an account home sits at the top. */
export const HomeItem: NavItem = { label: 'Account home', href: '/dashboard', icon: Home };

/** Recently opened screens, mirroring the shortcut rail in the reference shell. */
export const RecentItems: { label: string; caption: string; href: string }[] = [
  { label: 'Balanced Growth', caption: 'Model portfolio', href: '/model-portfolios/mp-02' },
  { label: 'Ananya Sharma', caption: 'Investor', href: '/investors/in-01' },
  { label: 'Compliance queue', caption: 'Oversight', href: '/compliance' },
];

export const NavSections: NavSection[] = [
  {
    title: 'Observe',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Compliance', href: '/compliance', icon: ShieldAlert, badge: 6 },
    ],
  },
  {
    title: 'Distribution',
    items: [
      { label: 'Investors', href: '/investors', icon: Users },
      { label: 'Agents', href: '/agents', icon: UsersRound },
      { label: 'Sub-admins', href: '/sub-admins', icon: UserCog },
    ],
  },
  {
    title: 'Advisory',
    items: [
      { label: 'Buckets', href: '/buckets', icon: Boxes },
      { label: 'Model Portfolios', href: '/model-portfolios', icon: Layers },
      { label: 'Review Meetings', href: '/review-meetings', icon: CalendarCheck },
    ],
  },
  {
    title: 'Support',
    items: [{ label: 'Risip Bot', href: '/risip-bot', icon: Bot }],
  },
];

/** Flat lookup used by the breadcrumb to name the section it is inside. */
export const NavItemsByHref = new Map<string, NavItem>(
  NavSections.flatMap((section) => section.items).map((item) => [item.href, item]),
);
