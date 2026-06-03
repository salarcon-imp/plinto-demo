type MonoDataRow = {
  label: string;
  value: string;
};

type MonoDataBlockProps = {
  title?: string;
  rows: MonoDataRow[];
};

export function MonoDataBlock({ title, rows }: MonoDataBlockProps) {
  return (
    <section className="mono-data-block">
      {title ? <h4 className="mono-data-block__title">{title}</h4> : null}
      <div className="mono-data-block__rows">
        {rows.map((row) => (
          <div className="mono-data-block__row" key={row.label}>
            <span className="mono-data-block__label">{row.label}</span>
            <span className="mono-data-block__value">{row.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
