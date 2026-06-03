import BrandMark from '../../assets/logos/BrandMark.svg';

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
      <img alt="" className="identity-badge__icon" src={BrandMark} />
      <span>{label}</span>
    </span>
  );
}
