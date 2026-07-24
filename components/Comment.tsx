import DeleteIcon from '../assets/images/delete-icon-black.svg';
import cn from '../utils/className';
import ColoredIcon from './ColoredIcon';
import UserIcon from './UserIcon';

// Comment component.
export default function Comment(props: {
  initials: string,
  author?: string,
  timestamp?: string,
  text?: string,
  incoming?: boolean,
  onClosePressed?: () => void,
  className?: string
}) {
  return (
    <div className={cn(
      'flex items-start gap-4 w-full',
      props.incoming && 'flex-row-reverse',
      props.className
    )}>
      <UserIcon initials={props.initials} size='sm' className='w-7 h-7 shrink-0 border border-white' />
      <div className={cn('relative flex-1 min-w-0 rounded-xl px-4 py-5 bg-grey-100', props.onClosePressed && 'pb-8')}>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between gap-6'>
            <span className={cn('font-body text-body-s text-grey-950', props.incoming && 'font-bold')}>
              {props.incoming ? 'VOUS' : props.author}
            </span>
            <span className='font-body text-body-2xs text-grey-600'>{props.timestamp}</span>
          </div>
          <p className='font-body text-body-2xs text-grey-950'>{props.text}</p>
        </div>

        {props.onClosePressed && (
          <button
            type='button'
            aria-label='Supprimer le commentaire'
            onClick={props.onClosePressed}
            className='absolute bottom-2 right-2 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-grey-600 hover:text-error'
          >
            <ColoredIcon src={DeleteIcon} color='currentColor' className='w-3.5 h-3.5' />
          </button>
        )}
      </div>
    </div>
  );
}
