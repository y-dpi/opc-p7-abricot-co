'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

import CloseIcon from '../assets/images/close-icon-black.svg';
import SearchIcon from '../assets/images/search-icon-black.svg';
import cn from '../utils/className';
import { SEARCH_PARAM } from '../utils/search';
import ColoredIcon from './ColoredIcon';

// Delay before query is written to the URL.
const DEBOUNCE_MS = 250;

// Search bar component.
export default function SearchBar(props: {
  label?: string,
  param?: string,
  placeholder?: string,
  className?: string
}) {
  const param = props.param ?? SEARCH_PARAM;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlValue = searchParams.get(param) ?? '';

  const [value, setValue] = useState(urlValue);
  const [pending, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hasValue = value.length > 0;
  const placeholder = props.placeholder ?? 'Rechercher';

  // Use URL query when it changes on its own but not while
  // one of our own updates is still on its way.
  useEffect(() => {
    if (pending || timer.current !== undefined) return;
    setValue(urlValue);
  }, [urlValue, pending]);

  // Drop pending URL update when search bar unmounts.
  useEffect(() => () => clearTimeout(timer.current), []);

  // Write query to URL without stacking up history entries.
  function commit(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query === '') params.delete(param);
    else params.set(param, query);

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString === '' ? pathname : `${pathname}?${queryString}`, { scroll: false });
    });
  }

  // Show keystroke immediately and reflect it in the URL once typing stops.
  function change(query: string) {
    setValue(query);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      timer.current = undefined;
      commit(query);
    }, DEBOUNCE_MS);
  }

  // Empty both field and URL parameter.
  function clear() {
    clearTimeout(timer.current);
    timer.current = undefined;
    setValue('');
    commit('');
  }

  return (
    <label className={cn('flex flex-col gap-2 w-full', props.className)}>
      <span className={props.label ? 'font-body text-body-s text-grey-950' : 'sr-only'}>
        {props.label ?? placeholder}
      </span>
      <div className='field-shell flex items-center gap-2 h-13 px-4 rounded border border-grey-200 bg-white'>
        <input
          type='search'
          value={value}
          onChange={(event) => change(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            clearTimeout(timer.current);
            timer.current = undefined;
            commit(value);
          }}
          placeholder={placeholder}
          className='flex-1 min-w-0 bg-transparent font-body text-body-xs text-grey-600 placeholder:text-grey-600 outline-none [&::-webkit-search-cancel-button]:hidden'
        />

        {hasValue && (
          <button
            type='button'
            aria-label='Effacer la recherche'
            onClick={clear}
            className='flex shrink-0 cursor-pointer items-center justify-center text-grey-600 hover:text-grey-950 mr-2'
          >
            <ColoredIcon src={CloseIcon} color='currentColor' className='w-2.5 h-2.5' />
          </button>
        )}

        <ColoredIcon src={SearchIcon} color='currentColor' className='h-3.5 w-3.5 shrink-0 text-grey-600' />
      </div>
    </label>
  );
}
