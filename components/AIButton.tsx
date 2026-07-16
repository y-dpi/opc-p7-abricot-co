import Image from 'next/image';

import StarPrimary from '../assets/images/star-primary.svg';
import StarWhite from '../assets/images/star-white.svg';
import cn from '../utils/className';

// AI button component.
export default function AIButton(props: {
  compact?: boolean
  value?: string
}) {
  return (
    <button className={cn(
      'group flex items-center justify-center w-full h-full gap-3 bg-brand-light hover:bg-brand-dark cursor-pointer',
      props.compact ? 'rounded-full' : 'rounded-xl'
    )}>
      <Image
        className={cn((props.compact) ? 'w-2 h-2' : 'w-5 h-5', 'block group-hover:hidden overflow-hidden')}
        alt='AI star icon'
        loading='eager'
        src={StarPrimary}
      />
      <Image
        className={cn((props.compact) ? 'w-2 h-2' : 'w-5 h-5', 'hidden group-hover:block overflow-hidden')}
        alt='AI star icon'
        loading='eager'
        src={StarWhite}
      />
      {props.value && !props.compact && (
        <span className='font-body text-body-m text-brand-dark group-hover:text-white overflow-hidden'>
          {props.value}
        </span>
      )}
    </button>
  );
}