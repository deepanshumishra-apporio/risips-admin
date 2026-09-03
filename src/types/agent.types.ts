export type AgentStatus = 'Active' | 'Suspended' | 'Onboarding';

export type AgentFlag = 'Licence Expiring' | 'KYC Backlog' | 'SIP Failures' | 'Clean';

export type Agent = {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  location: string;
  status: AgentStatus;
  aum: number;
  customerCount: number;
  activeSips: number;
  flags: AgentFlag[];
  licenceExpiresAt: string;
  joinedAt: string;
};

export type SubAdminRole = 'Compliance' | 'Operations' | 'Portfolio Curation' | 'Support';

export type SubAdminPermission =
  | 'Dashboard'
  | 'Investors'
  | 'Agents'
  | 'Model Portfolios'
  | 'Compliance'
  | 'Review Meetings';

export type SubAdmin = {
  id: string;
  name: string;
  email: string;
  role: SubAdminRole;
  status: 'Active' | 'Invited' | 'Disabled';
  permissions: SubAdminPermission[];
  lastActiveAt: string;
};
