import { useState } from 'react';
import type { IdentityRecord } from '../../types/identity-record';
import { IdentityBadge } from './IdentityBadge';
import { MonoDataBlock } from './MonoDataBlock';

type RecordAccordionProps = {
  record: IdentityRecord;
};

export function RecordAccordion({ record }: RecordAccordionProps) {
  const [open, setOpen] = useState(true);

  return (
    <section className="record-accordion">
      <button
        className="record-accordion__trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <div>
          <p className="record-accordion__eyebrow">The Record</p>
          <p className="record-accordion__summary">Certificate ID {record.certificateId}</p>
        </div>
        <span className="record-accordion__toggle" aria-hidden="true">
          {open ? '⌄' : '›'}
        </span>
      </button>

      {open ? (
        <div className="record-accordion__content">
          <div className="record-accordion__header">
            <IdentityBadge label={record.authenticityStatus} tone="technical" />
            <span className="record-accordion__keeper">{record.currentKeeper}</span>
          </div>

          <MonoDataBlock
            title="Registry"
            rows={[
              { label: 'Certificate ID', value: record.certificateId },
              { label: 'Hash', value: record.hash },
              { label: 'Timestamp', value: record.mintedAt },
              { label: 'Metadata', value: record.metadata.captureMethod },
            ]}
          />

          <div className="record-accordion__custody">
            <p className="record-accordion__eyebrow">Chain of Custody</p>
            {record.custody.map((entry) => (
              <article className="record-accordion__custody-entry" key={entry.id}>
                <div className="record-accordion__custody-meta">
                  <span>{entry.date}</span>
                  <span>{entry.location}</span>
                </div>
                <p className="record-accordion__custody-actor">
                  {entry.actor} · {entry.action}
                </p>
                <p className="record-accordion__custody-note">{entry.note}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
