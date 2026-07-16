import NextLink from 'next/link';

import cn from '../utils/className';

// Link (text link) component.
export default function Link(props: {
  label: string,
  href?: string,
  disabled?: boolean,
  className?: string
}) {
  return (
    <NextLink
      href={props.disabled ? '#' : (props.href ?? '#')}
      aria-disabled={props.disabled}
      className={cn(
        'font-body text-body-s underline',
        props.disabled ? 'text-grey-400 pointer-events-none' : 'text-brand-dark',
        props.className
      )}
    >
      {props.label}
    </NextLink>
  );
}
