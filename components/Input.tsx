import cn from '../utils/className';

// Text input component.
export default function Input(props: {
  label: string,
  value?: string,
  placeholder?: string,
  type?: string,
  className?: string
}) {
  return (
    <label className={cn('flex flex-col gap-2 w-full', props.className)}>
      <span className='font-body text-body-s text-grey-950'>{props.label}</span>
      <div className='flex items-center gap-2 h-13 px-4 rounded border border-grey-200 bg-white'>
        <input
          type={props.type ?? 'text'}
          defaultValue={props.value}
          placeholder={props.placeholder}
          className='flex-1 min-w-0 bg-transparent font-body text-body-xs text-grey-600 placeholder:text-grey-600 outline-none'
        />
      </div>
    </label>
  );
}
