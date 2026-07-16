import cn from '../utils/className';
import UserIcon from './UserIcon';

// Comment input field component.
export default function CommentField(props: {
  initials: string,
  value?: string,
  placeholder?: string,
  className?: string
}) {
  return (
    <div className={cn('flex items-start gap-4 w-full', props.className)}>
      <UserIcon initials={props.initials} size='sm' className='w-7 h-7 shrink-0 border border-white' />
      <div className='flex-1 min-w-0 flex items-center px-4 py-5 rounded-xl bg-grey-50'>
        <input
          type='text'
          defaultValue={props.value}
          placeholder={props.placeholder ?? 'Ajouter un commentaire...'}
          className='flex-1 min-w-0 bg-transparent font-body text-body-2xs text-grey-950 placeholder:text-grey-600 outline-none'
        />
      </div>
    </div>
  );
}
