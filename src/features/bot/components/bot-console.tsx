'use client';

import { Bot, Send } from 'lucide-react';
import { useState } from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { StatStrip } from '@/components/ui/stat-strip';
import { BotConversations } from '@/data/compliance';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/format';

const QuickIntents = [
  'KYC status',
  'SIP failure reason',
  'Change SIP date',
  'Redemption timelines',
  'Portfolio suitability',
  'Nominee update',
];

/** Risip Bot console: what the assistant is answering in the app, and which
 *  threads it handed to a human. */
export function BotConsole(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState(BotConversations[0]?.id ?? '');
  const [enabledIntents, setEnabledIntents] = useState<string[]>(QuickIntents.slice(0, 4));

  const selected = BotConversations.find((conversation) => conversation.id === selectedId);
  const escalated = BotConversations.filter((conversation) => conversation.handledBy === 'Escalated').length;
  const resolved = BotConversations.length - escalated;

  return (
    <div className="space-y-4">
      <StatStrip
        items={[
          { label: 'Conversations today', value: String(BotConversations.length) },
          {
            label: 'Resolved by bot',
            value: String(resolved),
            caption: `${escalated} escalated to an advisor`,
          },
          { label: 'Average rating', value: '4.3 / 5', caption: 'across rated threads' },
          { label: 'Median first reply', value: '4 s', caption: 'in-app assistant' },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <Card>
          <CardHeader title="Recent threads" subtitle="Newest first" />
          <ul className="divide-y divide-line">
            {BotConversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(conversation.id)}
                  className={cn(
                    'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                    conversation.id === selectedId ? 'bg-brand-soft' : 'hover:bg-surface-sunken',
                  )}
                >
                  <Avatar name={conversation.investorName} tone="neutral" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-semibold text-ink">
                      {conversation.investorName}
                    </span>
                    <span className="block truncate text-[12px] text-ink-muted">{conversation.intent}</span>
                  </span>
                  <Badge tone={conversation.handledBy === 'Escalated' ? 'warn' : 'success'}>
                    {conversation.handledBy === 'Escalated' ? 'Escalated' : 'Bot'}
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader
              title={selected ? `${selected.investorName} · ${selected.intent}` : 'Conversation'}
              subtitle={selected ? `${selected.messages} messages · ${formatDate(selected.updatedAt)}` : undefined}
            />
            <CardBody className="space-y-3">
              <div className="flex justify-end">
                <p className="max-w-[75%] rounded-2xl rounded-br-sm bg-brand px-3.5 py-2.5 text-[13px] text-white">
                  {selected?.intent}? I need this sorted before my next instalment.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-white">
                  <Bot className="size-4" />
                </span>
                <p className="max-w-[75%] rounded-2xl rounded-bl-sm bg-surface-sunken px-3.5 py-2.5 text-[13px] text-ink">
                  {selected?.lastMessage}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  placeholder="Reply as an advisor"
                  className="h-10 flex-1 rounded-lg border border-line-strong bg-surface px-3 text-[13.5px] text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none"
                />
                <Button variant="primary" icon={<Send className="size-4" />}>
                  Send
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Bot coverage"
              subtitle="Intents Risip Bot answers on its own. Anything else is routed to the servicing agent."
            />
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {QuickIntents.map((intent) => (
                  <Chip
                    key={intent}
                    label={intent}
                    selected={enabledIntents.includes(intent)}
                    onClick={() =>
                      setEnabledIntents((current) =>
                        current.includes(intent)
                          ? current.filter((entry) => entry !== intent)
                          : [...current, intent],
                      )
                    }
                  />
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
