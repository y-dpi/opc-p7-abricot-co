import cn from '../utils/className';
import UserIcon from './UserIcon';

// Comment input field component.
export default function CommentField(props: {
  initials: string,
  name?: string,
  value?: string,
  placeholder?: string,
  label?: string,
  className?: string
}) {
  const placeholder = props.placeholder ?? 'Ajouter un commentaire...';

  return (
    <label className={cn('flex items-start gap-4 w-full', props.className)}>
      <span className='sr-only'>{props.label ?? 'Ajouter un commentaire'}</span>
      <UserIcon initials={props.initials} size='sm' className='w-7 h-7 shrink-0 border border-white' />
      <div className='field-shell flex-1 min-w-0 flex items-center px-4 py-5 rounded-xl border border-transparent bg-grey-50'>
        <input
          type='text'
          name={props.name}
          defaultValue={props.value}
          placeholder={placeholder}
          className='flex-1 min-w-0 bg-transparent font-body text-body-2xs text-grey-950 placeholder:text-grey-600 outline-none'
        />
      </div>
    </label>
  );
}
