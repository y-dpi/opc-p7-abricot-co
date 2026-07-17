'use client';

import { useState } from 'react';

import cn from './../utils/className';
import Tag from './Tag';

// Types.
export type TaskStatus = 'todo' | 'in-progress' | 'done';

// Tag status mapping.
const STATUSES: { value: TaskStatus, color: 'red' | 'orange' | 'green', label: string }[] = [
  { value: 'todo', color: 'red', label: 'À faire' },
  { value: 'in-progress', color: 'orange', label: 'En cours' },
  { value: 'done', color: 'green', label: 'Terminée' }
];

// Task status selector component.
export default function StatusSelector(props: {
  value?: TaskStatus
}) {
  const [status, setStatus] = useState<TaskStatus>(props.value ?? 'todo');

  return (
    <div className='flex flex-col gap-4'>
      <span className='font-body text-body-s text-grey-950'>Statut :</span>
      <div className='flex flex-wrap gap-2'>
        {STATUSES.map((s) => (
          <button key={s.value} type='button' onClick={() => setStatus(s.value)} className='hover:cursor-pointer'>
            <Tag className={cn((status === s.value) ? 'border' : '')} color={s.color} label={s.label} muted={status !== s.value} />
          </button>
        ))}
      </div>
    </div>
  );
}
