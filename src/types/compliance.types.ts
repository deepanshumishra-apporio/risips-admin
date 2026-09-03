export type AlertSeverity = 'High' | 'Medium' | 'Low';

export type AlertKind =
  | 'Pending KYC'
  | 'Mandate Pending'
  | 'SIP Failure'
  | 'Agent Licence'
  | 'Nominee Missing';

export type ComplianceAlert = {
  id: string;
  kind: AlertKind;
  severity: AlertSeverity;
  subject: string;
  subjectType: 'Investor' | 'Agent';
  detail: string;
  raisedAt: string;
  ageInDays: number;
};

export type ReviewMeeting = {
  id: string;
  investorName: string;
  investorId: string;
  conductedBy: string;
  mode: 'In-person' | 'Video' | 'Phone';
  meetingDate: string;
  currentProfile: string;
  recommendedProfile: string;
  notes: string;
  status: 'Captured' | 'Profile Updated' | 'Scheduled';
};

export type BotConversation = {
  id: string;
  investorName: string;
  intent: string;
  lastMessage: string;
  handledBy: 'Risip Bot' | 'Escalated';
  messages: number;
  satisfaction: number | null;
  updatedAt: string;
};
