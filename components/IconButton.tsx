import NextLink from 'next/link';

import BackIcon from '../assets/images/back-icon-black.svg';
import ThreeDotsPrimary from '../assets/images/three-dots-icon-primary.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Icon button component.
export default function IconButton(props: {
  icon: 'back' | 'see-more',
  label?: string,
  active?: boolean,
  href?: string,
  onClick?: () => void,
  className?: string
}) {
  const label = props.label ?? (props.icon === 'back' ? 'Retour' : 'Plus d’options');

  const className = cn(
    'group flex items-center justify-center w-full h-full rounded-xl border bg-white hover:cursor-pointer',
    props.active ? 'border-brand-dark' : 'border-grey-200 hover:border-brand-dark',
    props.className
  );

  const icon = props.icon === 'back' ? (
    <ColoredIcon
      src={BackIcon}
      color='currentColor'
      className={cn(
        'w-4 h-3',
        props.active ? 'text-brand-dark' : 'text-grey-950 group-hover:text-brand-dark'
      )}
    />
  ) : (
    <ColoredIcon
      src={ThreeDotsPrimary}
      color={props.active ? 'var(--color-brand-dark)' : 'var(--color-grey-600)'}
      className='w-4 h-1'
    />
  );

  // Render a link when a href is given.
  if (props.href) {
    return (
      <NextLink href={props.href} aria-label={label} className={className}>
        {icon}
      </NextLink>
    );
  }

  return (
    <button type='button' aria-label={label} onClick={props.onClick} className={className}>
      {icon}
    </button>
  );
}
