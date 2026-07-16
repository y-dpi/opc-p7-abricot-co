import BackIcon from '../assets/images/back-icon-black.svg';
import ThreeDotsPrimary from '../assets/images/three-dots-icon-primary.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';

// Icon button component.
export default function IconButton(props: {
  icon: 'back' | 'see-more',
  active?: boolean,
  className?: string
}) {
  return (
    <button className={cn(
      'group flex items-center justify-center w-full h-full rounded-xl border bg-white hover:cursor-pointer',
      props.active ? 'border-brand-dark' : 'border-grey-200 hover:border-brand-dark',
      props.className
    )}>
      {props.icon === 'back' ? (
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
      )}
    </button>
  );
}
