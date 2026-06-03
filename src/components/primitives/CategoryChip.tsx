type CategoryChipProps = {
  label: string;
  active?: boolean;
};

export function CategoryChip({ label, active = false }: CategoryChipProps) {
  return <span className={`category-chip ${active ? 'category-chip--active' : ''}`}>{label}</span>;
}
