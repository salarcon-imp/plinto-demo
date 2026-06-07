type IdentityBadgeProps = {
  label?: string;
  tone?: 'light' | 'technical';
  compact?: boolean;
};

export function IdentityBadge({
  label = 'Identified',
  tone = 'light',
  compact = false,
}: IdentityBadgeProps) {
  return (
    <span
      className={`identity-badge identity-badge--${tone} ${compact ? 'identity-badge--compact' : ''}`.trim()}
    >
      <span>{label}</span>
    </span>
  );
}
