'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

import CloseIcon from '../assets/images/close-icon-black.svg';
import StarPrimary from '../assets/images/star-primary.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Modal shell component.
export default function Modal(props: {
  title?: string,
  showStar?: boolean,
  children?: ReactNode,
  className?: string,
  mock?: boolean
  bottom?: ReactNode,
}) {
  const [open, setOpen] = useState(true);

  if (!props.mock && !open) return null;

  const panel = (
    <div className={cn(
      '@container relative flex w-full max-h-[90svh] flex-col gap-10 rounded-xl bg-white px-0 sm:px-13 py-20 overflow-x-hidden',
      props.className
    )}>
      <span
        onClick={props.mock ? undefined : () => setOpen(false)}
        className='absolute right-9 top-9 block h-4 w-4 text-grey-950 hover:cursor-pointer'
      >
        <ColoredIcon src={CloseIcon} color='currentColor' />
      </span>
      {props.title && (
        <div className='flex items-center gap-2 px-5'>
          {props.showStar && (
            <ColoredIcon src={StarPrimary} color='var(--color-brand)' className='w-5 h-5' />
          )}
          <h2 className='font-heading text-h4 text-grey-800'>{props.title}</h2>
        </div>
      )}
      <div className='flex flex-col h-full gap-10 px-5 overflow-y-scroll overscroll-contain scrollbar-none'>{props.children}</div>
      <div className='block px-5'>{props.bottom}</div>
    </div>
  );

  // Return inline modal if mock.
  if (props.mock) return panel;

  // Return overlay modal if not.
  return (
    <div
      onScroll={(e) => e.stopPropagation()}
      onClick={() => setOpen(false)}
      className='fixed inset-0 z-50 flex items-center overflow-scroll overscroll-contain scrollbar-none justify-center bg-grey-950/50 p-4'
    >
      <div onClick={(e) => e.stopPropagation()} className='w-full max-w-150'>
        {panel}
      </div>
    </div>
  );
}
