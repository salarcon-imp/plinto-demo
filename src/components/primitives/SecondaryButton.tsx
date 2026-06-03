import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type SecondaryButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function SecondaryButton({
  children,
  className = '',
  type = 'button',
  ...rest
}: SecondaryButtonProps) {
  return (
    <button className={`button button--secondary ${className}`.trim()} type={type} {...rest}>
      {children}
    </button>
  );
}
