'use client';

import { useState } from 'react';

import CloseIcon from '../assets/images/close-icon-black.svg';
import SearchIcon from '../assets/images/search-icon-black.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Search bar component.
export default function SearchBar(props: {
  label?: string,
  value?: string,
  placeholder?: string,
  className?: string
}) {
  const [value, setValue] = useState(props.value ?? '');
  const hasValue = value.length > 0;

  return (
    <label className={cn('flex flex-col gap-2 w-full', props.className)}>
      {props.label && <span className='font-body text-body-s text-grey-950'>{props.label}</span>}
      <div className='flex items-center gap-2 h-13 px-4 rounded border border-grey-200 bg-white'>
        <input
          type='search'
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={props.placeholder ?? 'Rechercher'}
          className='flex-1 min-w-0 bg-transparent font-body text-body-xs text-grey-600 placeholder:text-grey-600 outline-none [&::-webkit-search-cancel-button]:hidden'
        />

        {hasValue && (
          <button
            type='button'
            aria-label='Effacer la recherche'
            onClick={() => setValue('')}
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
