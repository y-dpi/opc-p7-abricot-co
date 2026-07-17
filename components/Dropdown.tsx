'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '../assets/images/close-icon-black.svg';
import DownBrackets from '../assets/images/down-angle-brackets-icon-black.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Checkbox shown to the left of each option in multiple choice mode.
function Tickbox(props: { checked: boolean }) {
  return (
    <span className={cn(
      'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
      props.checked ? 'border-brand-dark bg-brand-dark text-white' : 'border-grey-400'
    )}>
      {props.checked && (
        <svg viewBox='0 0 12 12' fill='none' className='h-2.5 w-2.5' aria-hidden='true'>
          <path d='M2.5 6.5L5 9L9.5 3.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      )}
    </span>
  );
}

// Dropdown component.
export default function Dropdown(props: {
  label?: string,
  value?: string | string[],
  placeholder?: string,
  multiplePlaceholder?: string,
  options?: string[],
  multiple?: boolean,
  className?: string
}) {
  const options = props.options ?? [];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(
    props.value == null ? [] : Array.isArray(props.value) ? props.value : [props.value]
  );
  const [rect, setRect] = useState({ top: 0, left: 0, width: 0 });
  const fieldRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const hasValue = selected.length > 0;

  // Display value of the field.
  const display = !hasValue
    ? props.placeholder
    : props.multiple && selected.length > 1
      ? `${selected.length} ${props.multiplePlaceholder ?? ''}`.trim()
      : selected[0];

  // Pick (single) or toggle (multiple) an option.
  function choose(option: string) {
    if (props.multiple) {
      setSelected((current) =>
        current.includes(option)
          ? current.filter((value) => value !== option)
          : [...current, option]
      );
      return;
    }
    setSelected([option]);
    setOpen(false);
  }

  // Measure the field so the dropdown overlay can anchor to it.
  const updateRect = useCallback(() => {
    const el = fieldRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    setRect({ top: box.bottom + 4, left: box.left, width: box.width });
  }, []);

  // Toggle the dropdown overlay.
  function toggle() {
    if (!open) updateRect();
    setOpen((value) => !value);
  }

  // Handle closing, moving, and resizing the dropdown.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (fieldRef.current?.contains(target) || listRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [open, updateRect]);

  return (
    <div className={cn('flex flex-col gap-2 w-full', props.className)}>
      {props.label && <span className='font-body text-body-s text-grey-950'>{props.label}</span>}

      <div
        ref={fieldRef}
        role='button'
        tabIndex={0}
        aria-haspopup='listbox'
        aria-expanded={open}
        aria-controls={listId}
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
          } else if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            updateRect();
            setOpen(true);
          }
        }}
        className='flex items-center gap-2 h-13 px-4 rounded border border-grey-200 bg-white cursor-pointer'
      >
        <span className='flex-1 min-w-0 truncate font-body text-body-xs text-grey-600'>
          {display}
        </span>

        {hasValue && (
          <button
            type='button'
            aria-label='Effacer la sélection'
            onClick={(event) => {
              event.stopPropagation();
              setSelected([]);
              setOpen(false);
            }}
            className='flex shrink-0 cursor-pointer items-center justify-center text-grey-600 hover:text-grey-950'
          >
            <ColoredIcon src={CloseIcon} color='currentColor' className='w-2.5 h-2.5' />
          </button>
        )}

        <Image
          className={cn('w-4 h-2 shrink-0 transition-transform', hasValue && 'ml-2', open && 'rotate-180')}
          alt=''
          src={DownBrackets}
        />
      </div>

      {open && createPortal(
        <ul
          ref={listRef}
          id={listId}
          role='listbox'
          aria-multiselectable={props.multiple}
          style={{ position: 'fixed', top: rect.top, left: rect.left, width: rect.width }}
          className='z-50 max-h-60 overflow-auto rounded border border-grey-200 bg-white py-1 shadow-[0_4px_12px_1px_rgba(0,0,0,0.08)]'
        >
          {options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <li key={option} role='option' aria-selected={isSelected}>
                <button
                  type='button'
                  onClick={() => choose(option)}
                  className={cn(
                    'flex w-full cursor-pointer items-center px-4 py-2 text-left font-body text-body-xs',
                    props.multiple ? 'gap-4' : 'gap-2',
                    isSelected ? 'bg-brand-light text-brand-dark' : 'text-grey-600 hover:bg-grey-50'
                  )}
                >
                  {props.multiple && <Tickbox checked={isSelected} />}
                  <span className='min-w-0 truncate'>{option}</span>
                </button>
              </li>
            );
          })}
        </ul>,
        document.body
      )}
    </div>
  );
}
