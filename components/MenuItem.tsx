import NextLink from 'next/link';
import type { ReactNode } from 'react';

import cn from '../utils/className';

// Menu item component.
export default function MenuItem(props: {
  label: string,
  icon: ReactNode,
  href: string,
  active?: boolean,
  className?: string
}) {
  return (
    <NextLink
      href={props.href}
      className={cn(
        'flex w-full h-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-body text-body-m sm:gap-4 sm:px-6 sm:py-4 lg:px-16 lg:py-7',
        props.active ? 'bg-grey-950 text-white' : 'bg-white text-brand-dark',
        props.className
      )}
    >
      <span className='flex items-center justify-center w-6 h-6 shrink-0'>{props.icon}</span>
      <span className='hidden whitespace-nowrap sm:inline'>{props.label}</span>
    </NextLink>
  );
}
