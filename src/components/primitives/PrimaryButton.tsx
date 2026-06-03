import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type PrimaryButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function PrimaryButton({
  children,
  className = '',
  type = 'button',
  ...rest
}: PrimaryButtonProps) {
  return (
    <button className={`button button--primary ${className}`.trim()} type={type} {...rest}>
      {children}
    </button>
  );
}
