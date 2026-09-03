'use client';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MenuCell } from '@/components/ui/row-menu';
import { SelectCell, Table, Td } from '@/components/ui/table';
import type { Agent } from '@/types/agent.types';
import { formatCount, formatInr } from '@/utils/format';
import { AgentFlagTone } from '@/utils/tone';

const Headers = ['Agent', 'AUM', '# Customers', 'Location', 'Flags'] as const;

type AgentsTableProps = {
  agents: Agent[];
  onSelect?: (agent: Agent) => void;
};

/** Location is carried on purpose — phase 02 uses it to route agents to
 *  in-person goal-mapping visits. */
export function AgentsTable({ agents, onSelect }: AgentsTableProps): React.JSX.Element {
  return (
    <Table headers={Headers} selectable withMenu>
      {agents.map((agent) => (
        <tr key={agent.id} className="group transition-colors hover:bg-surface-sunken">
          <SelectCell label={agent.name} />

          <Td>
            <button
              type="button"
              onClick={() => onSelect?.(agent)}
              className="flex items-center gap-2.5 text-left"
              disabled={!onSelect}
            >
              <Avatar name={agent.name} />
              <span>
                <span
                  className={`block text-[13.5px] font-semibold text-ink ${onSelect ? 'group-hover:text-brand' : ''}`}
                >
                  {agent.name}
                </span>
                <span className="tabular block text-[12px] text-ink-muted">{agent.code}</span>
              </span>
            </button>
          </Td>
          <Td className="tabular font-semibold text-ink">{formatInr(agent.aum)}</Td>
          <Td className="tabular">
            {formatCount(agent.customerCount)}
            <span className="ml-1.5 text-[12px] text-ink-muted">({formatCount(agent.activeSips)} SIPs)</span>
          </Td>
          <Td>{agent.location}</Td>
          <Td>
            <div className="flex flex-wrap gap-1.5">
              {agent.flags.map((flag) => (
                <Badge key={flag} tone={AgentFlagTone[flag]} dot>
                  {flag}
                </Badge>
              ))}
            </div>
          </Td>

          <MenuCell
            label={agent.name}
            items={[
              { label: 'View details', onSelect: () => onSelect?.(agent) },
              { label: 'Reassign investors' },
              { label: 'Request licence proof' },
              { label: 'Suspend agent', tone: 'danger' },
            ]}
          />
        </tr>
      ))}
    </Table>
  );
}
