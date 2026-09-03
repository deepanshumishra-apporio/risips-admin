'use client';

import { ShieldCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { Field, SelectInput, TextInput } from '@/components/ui/field';
import { MenuCell } from '@/components/ui/row-menu';
import { SidePanel } from '@/components/ui/side-panel';
import { SelectCell, Table, Td } from '@/components/ui/table';
import { SubAdmins } from '@/data/agents';
import type { SubAdmin, SubAdminPermission, SubAdminRole } from '@/types/agent.types';
import { formatDate } from '@/utils/format';

const Headers = ['Member', 'Role', 'Permissions', 'Status', 'Last active'] as const;

const AllPermissions: SubAdminPermission[] = [
  'Dashboard',
  'Investors',
  'Agents',
  'Model Portfolios',
  'Compliance',
  'Review Meetings',
];

const Roles: SubAdminRole[] = ['Compliance', 'Operations', 'Portfolio Curation', 'Support'];

const StatusTone = {
  Active: 'success',
  Invited: 'warn',
  Disabled: 'neutral',
} as const;

export function SubAdminsManager(): React.JSX.Element {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [granted, setGranted] = useState<SubAdminPermission[]>(['Dashboard', 'Investors']);
  const [editing, setEditing] = useState<SubAdmin | null>(null);

  const togglePermission = (permission: SubAdminPermission): void => {
    setGranted((current) =>
      current.includes(permission)
        ? current.filter((entry) => entry !== permission)
        : [...current, permission],
    );
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Members"
          subtitle="Delegated access to the portal. Permissions decide which sections a member can open."
          action={
            <Button variant="primary" icon={<UserPlus className="size-4" />} onClick={() => setInviteOpen(true)}>
              Invite sub-admin
            </Button>
          }
        />

        <Table headers={Headers} selectable withMenu>
          {SubAdmins.map((member) => (
            <tr key={member.id} className="transition-colors hover:bg-surface-sunken">
              <SelectCell label={member.name} />

              <Td>
                <div className="flex items-center gap-2.5">
                  <Avatar name={member.name} tone="teal" />
                  <span>
                    <span className="block text-[13.5px] font-semibold text-ink">{member.name}</span>
                    <span className="block text-[12px] text-ink-muted">{member.email}</span>
                  </span>
                </div>
              </Td>
              <Td>
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  <ShieldCheck className="size-3.5 text-brand" />
                  {member.role}
                </span>
              </Td>
              <Td>
                <div className="flex max-w-[280px] flex-wrap gap-1.5">
                  {member.permissions.map((permission) => (
                    <Badge key={permission} tone="neutral">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </Td>
              <Td>
                <Badge tone={StatusTone[member.status]} dot>
                  {member.status}
                </Badge>
              </Td>
              <Td className="tabular">{formatDate(member.lastActiveAt)}</Td>
              <MenuCell
                label={member.name}
                items={[
                  {
                    label: 'Edit permissions',
                    onSelect: () => {
                      setEditing(member);
                      setGranted(member.permissions);
                      setInviteOpen(true);
                    },
                  },
                  { label: 'Resend invite' },
                  { label: 'Disable access', tone: 'danger' },
                ]}
              />
            </tr>
          ))}
        </Table>
      </Card>

      <SidePanel
        open={inviteOpen}
        title={editing ? `Manage ${editing.name}` : 'Invite sub-admin'}
        subtitle="Access is additive — start narrow and widen it later."
        onClose={() => {
          setInviteOpen(false);
          setEditing(null);
        }}
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={() => {
                setInviteOpen(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary">{editing ? 'Save changes' : 'Send invite'}</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field label="Full name" required>
            <TextInput defaultValue={editing?.name ?? ''} placeholder="e.g. Nikhil Raut" />
          </Field>

          <Field label="Work email" required>
            <TextInput type="email" defaultValue={editing?.email ?? ''} placeholder="name@risips.in" />
          </Field>

          <Field label="Role">
            <SelectInput defaultValue={editing?.role ?? 'Operations'}>
              {Roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </SelectInput>
          </Field>

          <div>
            <p className="mb-2 text-[13px] font-medium text-ink-soft">Section access</p>
            <div className="flex flex-wrap gap-2">
              {AllPermissions.map((permission) => (
                <Chip
                  key={permission}
                  label={permission}
                  selected={granted.includes(permission)}
                  onClick={() => togglePermission(permission)}
                />
              ))}
            </div>
          </div>
        </div>
      </SidePanel>
    </>
  );
}
