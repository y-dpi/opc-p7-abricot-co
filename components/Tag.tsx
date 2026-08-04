import cn from '../utils/className';

// Types.
type TagColor = 'green' | 'red' | 'orange' | 'blue' | 'brand' | 'grey';

// Color mapping.
const TAG_STYLES: Record<TagColor, string> = {
  green: 'bg-success-light text-success',
  red: 'bg-error-light text-error',
  orange: 'bg-warning-light text-warning',
  blue: 'bg-info-light text-info',
  brand: 'bg-brand-light text-brand-dark',
  grey: 'bg-grey-200 text-grey-600'
};
const TAG_MUTED_STYLES: Record<TagColor, string> = {
  green: 'bg-success-light/50 text-success',
  red: 'bg-error-light/50 text-error',
  orange: 'bg-warning-light/50 text-warning',
  blue: 'bg-info-light/50 text-info',
  brand: 'bg-brand-light/50 text-brand-dark',
  grey: 'bg-grey-200/50 text-grey-600'
};

// Tag component.
export default function Tag(props: {
  label: string,
  color: TagColor,
  muted?: boolean,
  compact?: boolean,
  className?: string
}) {
  return (
    <span className={cn(
      'inline-flex items-center justify-center rounded-full px-4 py-1 font-body text-body-s whitespace-nowrap',
      props.compact && 'px-2',
      props.muted ? TAG_MUTED_STYLES[props.color] : TAG_STYLES[props.color],
      props.className
    )}>
      {props.compact ? (
        <>
          <span className='sr-only'>{props.label}</span>
          <span aria-hidden='true'>●</span>
        </>
      ) : props.label}
    </span>
  );
}
