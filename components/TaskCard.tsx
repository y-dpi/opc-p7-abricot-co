import Image from 'next/image';

import CalendarGrey from '../assets/images/calendar-icon-grey.svg';
import FolderPrimary from '../assets/images/folder-icon-primary.svg';
import MessageGrey from '../assets/images/message-icon-grey.svg';
import cn from '../utils/className';
import Button from './Button';
import ColoredIcon from './ColoredIcon';
import Tag from './Tag';

// Types.
type TaskStatus = 'todo' | 'in-progress' | 'done';

// Tag status mapping.
const STATUS: Record<TaskStatus, { label: string, color: 'red' | 'orange' | 'green' }> = {
  'todo': { label: 'À faire', color: 'red' },
  'in-progress': { label: 'En cours', color: 'orange' },
  'done': { label: 'Terminée', color: 'green' }
};

// Status tag.
function StatusTag({ status, compact }: { status: TaskStatus, compact?: boolean }) {
  return <Tag color={STATUS[status].color} label={STATUS[status].label} compact={compact} />;
}

// Task card data row.
function TitleBlock({ title, description }: { title: string, description: string }) {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-heading text-h5 text-grey-950'>{title}</h3>
      <p className='font-body text-body-s text-grey-600'>{description}</p>
    </div>
  );
}

// Task card metadata row.
function MetaRow({ projectName, date, commentsCount }: {
  projectName: string,
  date: string,
  commentsCount: number
}) {
  return (
    <div className='flex items-center gap-4 text-grey-600 @max-[350px]:flex-col @max-[350px]:items-start @max-[350px]:gap-2'>
      <div className='flex items-center gap-2'>
        <ColoredIcon src={FolderPrimary} color='var(--color-grey-400)' className='w-4 h-4' />
        <span className='font-body text-body-xs'>{projectName}</span>
      </div>
      <span className='h-3 w-px bg-grey-400 @max-[350px]:hidden' />
      <div className='flex items-center gap-4 @max-[150px]:flex-col @max-[150px]:items-start @max-[150px]:gap-2'>
        <div className='flex items-center gap-2'>
          <Image className='w-4 h-4' alt='' src={CalendarGrey} />
          <span className='font-body text-body-xs'>{date}</span>
        </div>
        <span className='h-3 w-px bg-grey-400 @max-[150px]:hidden' />
        <div className='flex items-center gap-2'>
          <Image className='w-4 h-4' alt='' src={MessageGrey} />
          <span className='font-body text-body-xs'>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
}

// Task card component.
export default function TaskCard(props: {
  title?: string,
  description?: string,
  status?: TaskStatus,
  projectName?: string,
  date?: string,
  commentsCount?: number,
  className?: string
}) {
  const title = props.title ?? 'Tâche sans nom';
  const description = props.description ?? '';
  const status = props.status ?? 'todo';
  const projectName = props.projectName ?? 'Projet sans nom';
  const date = props.date ?? 'Aucune date';
  const commentsCount = props.commentsCount ?? 0;

  const shell = 'w-full rounded-xl border border-grey-200 bg-white px-10 py-[25px]';

  return (
    <article className={cn('@container', shell, props.className)}>

      {/* Over 510px width */}
      <div className='flex items-center justify-between gap-8 @max-[510px]:hidden'>
        <div className='flex flex-col gap-8'>
          <TitleBlock title={title} description={description} />
          <MetaRow projectName={projectName} date={date} commentsCount={commentsCount} />
        </div>
        <div className='flex flex-col items-end gap-9'>
          <StatusTag status={status} />
          <div className='h-13 w-30'>
            <Button label='Voir' />
          </div>
        </div>
      </div>

      {/* Under 510px width */}
      <div className='hidden flex-col gap-8 @max-[510px]:flex'>
        <div className='flex flex-col gap-8'>
          <div className='flex items-start justify-between gap-8'>
            <TitleBlock title={title} description={description} />
            <div className='block @max-[200px]:hidden'>
              <StatusTag status={status} />
            </div>
            <div className='hidden @max-[200px]:block'>
              <StatusTag status={status} compact={true} />
            </div>
          </div>
          <MetaRow projectName={projectName} date={date} commentsCount={commentsCount} />
        </div>
        <div className='h-13 w-full max-w-30'>
          <Button label='Voir' />
        </div>
      </div>
    </article>
  );
}
