import cn from '../../utils/className';
import AIButton from '../AIButton';

// AI prompt bar component.
export default function PromptBar(props: {
  className?: string,
  placeholder?: string
}) {
  return (
    <label className={cn(
      'flex w-full h-full items-center justify-between gap-3 rounded-full bg-grey-50 px-8 py-5 hover:cursor-text',
      props.className
    )}>
      <input
        type='text'
        placeholder={props.placeholder ?? ''}
        className='flex-1 min-w-0 bg-transparent font-body text-body-2xs text-grey-950 placeholder:text-grey-950 outline-none'
      />
      <div className='h-6 w-6 shrink-0'>
        <AIButton compact />
      </div>
    </label>
  );
}
