import NextLink from 'next/link';

import cn from '../utils/className';

// Button component.
export default function Button(props: {
  label: string,
  variant?: 'default' | 'outline',
  disabled?: boolean,
  type?: 'button' | 'submit',
  href?: string,
  onClick?: () => void,
  className?: string
}) {
  const className = cn(
    'flex items-center justify-center w-full h-full px-6 rounded-xl font-body text-body-m cursor-pointer',
    props.disabled
      ? 'bg-grey-200 text-grey-600 cursor-not-allowed'
      : props.variant === 'outline'
        ? 'bg-white text-brand-dark border border-brand-dark hover:bg-brand-light'
        : 'bg-grey-800 text-white hover:bg-grey-950',
    props.className
  );

  // Render a link when a href is given.
  if (props.href && !props.disabled) {
    return <NextLink href={props.href} className={className}>{props.label}</NextLink>;
  }

  return (
    <button
      type={props.type ?? 'submit'}
      disabled={props.disabled}
      onClick={props.onClick}
      className={className}
    >
      {props.label}
    </button>
  );
}
