'use client';

import { useState } from 'react';

import EyeIcon from '../assets/images/eye-icon-black.svg';
import EyeOffIcon from '../assets/images/eye-off-icon-black.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Text input component.
export default function Input(props: {
  label: string,
  name?: string,
  value?: string,
  placeholder?: string,
  type?: string,
  className?: string
}) {
  const isPassword = props.type === 'password';
  const [visible, setVisible] = useState(false);
  const type = isPassword && visible ? 'text' : (props.type ?? 'text');

  return (
    <label className={cn('flex flex-col gap-2 w-full', props.className)}>
      <span className='font-body text-body-s text-grey-950'>{props.label}</span>
      <div className='field-shell flex items-center gap-2 h-13 px-4 rounded border border-grey-200 bg-white'>
        <input
          name={props.name}
          type={type}
          defaultValue={props.value}
          placeholder={props.placeholder}
          className='flex-1 min-w-0 bg-transparent font-body text-body-xs text-grey-600 placeholder:text-grey-600 outline-none'
        />

        {isPassword && (
          <button
            type='button'
            aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            onClick={() => setVisible((value) => !value)}
            className='flex shrink-0 cursor-pointer items-center justify-center text-grey-600 hover:text-grey-950'
          >
            <ColoredIcon src={visible ? EyeOffIcon : EyeIcon} color='currentColor' className='w-4 h-4' />
          </button>
        )}
      </div>
    </label>
  );
}
