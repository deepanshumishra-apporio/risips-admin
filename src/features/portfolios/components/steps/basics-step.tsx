'use client';

import { Field, TextArea, TextInput } from '@/components/ui/field';
import type { PortfolioDraftApi } from '@/features/portfolios/use-portfolio-draft';

/** Deliberately thin — name plus a one-liner. The real decisions start next. */
export function BasicsStep({ draft, update }: PortfolioDraftApi): React.JSX.Element {
  return (
    <div className="max-w-xl space-y-5">
      <Field label="Portfolio name" required hint="Investors see this name in the app.">
        <TextInput
          value={draft.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="e.g. Balanced Growth"
        />
      </Field>

      <Field
        label="One-line description"
        hint="What this basket is for, in the words an agent would use on a call."
      >
        <TextArea
          value={draft.description}
          onChange={(event) => update('description', event.target.value)}
          placeholder="Growth with a debt cushion, for investors with a 7-10 year horizon."
          rows={3}
        />
      </Field>

      <Field label="Minimum SIP" hint="The smallest monthly instalment this basket can be started with.">
        <TextInput
          type="number"
          step={500}
          value={draft.minimumSip}
          onChange={(event) => update('minimumSip', Number(event.target.value))}
        />
      </Field>
    </div>
  );
}
