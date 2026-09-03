import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { BotConsole } from '@/features/bot/components/bot-console';

export default function RisipBotPage(): React.JSX.Element {
  return (
    <>
      <PageHeader
        title="Risip Bot"
        description="The in-app assistant that handles customer queries, and the threads it escalated to a human advisor."
        actions={
          <Badge tone="success" dot>
            Live in app
          </Badge>
        }
      />
      <BotConsole />
    </>
  );
}
