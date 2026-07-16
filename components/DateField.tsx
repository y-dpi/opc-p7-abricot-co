'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';

import CalendarGrey from '../assets/images/calendar-icon-grey.svg';
import cn from '../utils/className';

// Format Date as the yyyy-MM-dd string expected by native date input.
function toInputValue(date?: Date) {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Parse yyyy-MM-dd string Date as used internally by our component.
function fromInputValue(value: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

// Display field value ('9 mars'/'March 9' OR '9 mars 2025'/'March 9, 2025')
function formatDate(date: Date) {
  const sameYear = date.getFullYear() === new Date().getFullYear();
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    ...(sameYear ? {} : { year: 'numeric' })
  }).format(date);
}

// Date field component.
export default function DateField(props: {
  label: string,
  value?: Date,
  className?: string
}) {
  const [date, setDate] = useState<Date | undefined>(props.value);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  // Open native browser date picker.
  function openPicker() {
    const input = inputRef.current;
    if (input && typeof input.showPicker === 'function') input.showPicker();
  }

  return (
    <div className={cn('flex flex-col gap-2 w-full', props.className)}>
      <label htmlFor={inputId} className='font-body text-body-s text-grey-950'>{props.label}</label>
      <div
        onClick={openPicker}
        className='flex items-center gap-2 h-13 px-4 rounded border border-grey-200 bg-white cursor-pointer'
      >
        <span
          aria-hidden='true'
          suppressHydrationWarning
          className='flex-1 min-w-0 truncate font-body text-body-xs text-grey-600'
        >
          {date && formatDate(date)}
        </span>
        <Image className='w-4 h-4 shrink-0' alt='' src={CalendarGrey} />
        <input
          id={inputId}
          ref={inputRef}
          type='date'
          value={toInputValue(date)}
          onChange={(event) => setDate(fromInputValue(event.target.value))}
          className='sr-only'
        />
      </div>
    </div>
  );
}
