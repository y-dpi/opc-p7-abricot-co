'use client';

import { useState } from 'react';

import CalendarGrey from '../assets/images/calendar-icon-grey.svg';
import DownBrackets from '../assets/images/down-angle-brackets-icon-black.svg';
import cn from '../utils/className';
import Button from './Button';
import ColoredIcon from './ColoredIcon';
import Comment from './Comment';
import CommentField from './CommentField';
import IconButton from './IconButton';
import Tag from './Tag';
import UserIcon from './UserIcon';

// Types.
type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Assignee {
  initials: string;
  name: string;
}

interface TaskComment {
  initials: string;
  author: string;
  timestamp: string;
  text: string;
}

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

// Task info component.
export default function TaskInfo(props: {
  title?: string,
  description?: string,
  status?: TaskStatus,
  dueDate?: string,
  commentsCount?: number,
  assignees?: Assignee[],
  comments?: TaskComment[],
  currentUserInitials?: string,
  className?: string
}) {
  const title = props.title ?? 'Tâche sans nom';
  const description = props.description ?? '';
  const status = props.status ?? 'todo';
  const dueDate = props.dueDate ?? 'Aucune date';
  const assignees = props.assignees ?? [];
  const comments = props.comments ?? [];
  const commentsCount = props.commentsCount ?? comments.length;

  const [open, setOpen] = useState(false);

  const shell = 'w-full rounded-xl border border-grey-200 bg-white px-10 py-[25px]';

  return (
    <article className={cn('@container flex flex-col gap-6', shell, props.className)}>

      {/* Header */}
      <div className='flex items-start justify-between gap-8 overflow-hidden'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <h3 className='font-heading text-h5 text-grey-950'>{title}</h3>
            <div className='block @max-[350px]:hidden'>
              <StatusTag status={status} />
            </div>
          </div>
          <p className='font-body text-body-s text-grey-600'>{description}</p>
        </div>
        <div className='flex flex-col gap-2 shrink-0 object-center items-center justify-center content-center'>
          <IconButton icon='see-more' className='w-14 h-14' />
          <div className='hidden @max-[350px]:block'>
            <StatusTag status={status} compact={true} />
          </div>
        </div>
      </div>

      {/* Due Date */}
      <div className='flex @max-[140px]:flex-col gap-2 overflow-hidden'>
        <span className='font-body text-body-xs text-grey-600'>Échéance :</span>
        <div className='flex items-center gap-1 text-grey-800'>
          <ColoredIcon src={CalendarGrey} color='var(--color-grey-800)' className='w-4 h-4' />
          <span className='font-body text-body-xs'>{dueDate}</span>
        </div>
      </div>

      {/* Assignees */}
      {assignees.length > 0 && (
        <div className='flex flex-wrap items-center gap-2 overflow-hidden'>
          <span className='font-body text-body-xs text-grey-600'>Assigné à :</span>
          {assignees.map((assignee, index) => (
            <div key={`${index}-${assignee.initials}`} className='flex items-center gap-1'>
              <UserIcon
                initials={assignee.initials}
                size='sm'
                className='w-7 h-7 bg-grey-200 text-grey-950 ring-2 ring-white'
              />
              <Tag color='grey' label={assignee.name} />
            </div>
          ))}
        </div>
      )}

      <hr className='border-grey-200' />

      {/* Comments Dropdown */}
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className='flex items-center justify-between hover:cursor-pointer'
      >
        <span className='font-body text-body-s text-grey-800 overflow-hidden'>Commentaires ({commentsCount})</span>
        <ColoredIcon
          src={DownBrackets}
          color='var(--color-grey-950)'
          className={cn('w-4 h-2 transition-transform', open && 'rotate-180')}
        />
      </button>

      {/* Comments List */}
      {open && (
        <div className='flex flex-col items-end gap-4'>
          {comments.map((comment, index) => (
            <Comment
              key={`${index}-${comment.author}`}
              initials={comment.initials}
              author={comment.author}
              timestamp={comment.timestamp}
              text={comment.text}
            />
          ))}
          {props.currentUserInitials && <>
            <CommentField initials={props.currentUserInitials} />
            <div className='h-13 w-full max-w-52'>
              <Button label='Envoyer' disabled />
            </div>
          </>}
        </div>
      )}
    </article>
  );
}
