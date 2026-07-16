import NextLink from 'next/link';
import type { ReactNode } from 'react';

import cn from '../utils/className';

// Chips component.
export default function Chips(props: {
  label: string,
  icon?: ReactNode,
  active?: boolean,
  href?: string,
  className?: string
}) {
  const className = cn(
    'inline-flex w-full h-full items-center justify-center gap-[14px] rounded-lg px-4 py-[14px] font-body text-body-s text-brand-dark',
    props.active ? 'bg-brand-light' : 'bg-white',
    props.className
  );
  const content = (
    <>
      {props.icon && (
        <span className='flex items-center justify-center w-4 h-4 shrink-0'>{props.icon}</span>
      )}
      <span className='whitespace-nowrap'>{props.label}</span>
    </>
  );

  if (props.href) {
    return <NextLink href={props.href} className={className}>{content}</NextLink>;
  }
  return <button className={className}>{content}</button>;
}
