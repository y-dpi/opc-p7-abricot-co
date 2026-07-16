import cn from '../utils/className';

// User icon (avatar with initials) component.
export default function UserIcon(props: {
  initials: string,
  active?: boolean,
  size?: 'sm' | 'md',
  className?: string
}) {
  return (
    <span className={cn(
      'inline-flex items-center justify-center rounded-full font-body uppercase w-full h-full',
      props.size === 'sm' ? 'text-caption-s' : 'text-caption-l',
      props.active ? 'bg-brand-dark text-white' : 'bg-brand-light text-grey-950',
      props.className
    )}>
      {props.initials}
    </span>
  );
}
