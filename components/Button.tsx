import cn from '../utils/className';

// Button component.
export default function Button(props: {
  label: string,
  variant?: 'default' | 'outline',
  disabled?: boolean,
  className?: string
}) {
  return (
    <button
      disabled={props.disabled}
      className={cn(
        'flex items-center justify-center w-full h-full px-6 rounded-xl font-body text-body-m cursor-pointer',
        props.disabled
          ? 'bg-grey-200 text-grey-400 cursor-not-allowed'
          : props.variant === 'outline'
            ? 'bg-white text-brand-dark border border-brand-dark hover:bg-brand-light'
            : 'bg-grey-800 text-white hover:bg-grey-950',
        props.className
      )}
    >
      {props.label}
    </button>
  );
}
