'use client';

import { type ComponentProps, useState } from 'react';

import Dropdown from './Dropdown';
import SearchBar from './SearchBar';
import TaskInfo from './TaskInfo';

// Reuse TaskInfo prop type and add id for the list key.
type TaskItem = ComponentProps<typeof TaskInfo> & { id: string };

// Status filter options.
const STATUS_OPTIONS = [
  { label: 'À faire', value: 'todo' },
  { label: 'En cours', value: 'in-progress' },
  { label: 'Terminée', value: 'done' },
];

// Tasks card body component.
export default function ProjectTasks(props: { tasks: TaskItem[] }) {
  const [statuses, setStatuses] = useState<string[]>([]);

  const visible = statuses.length === 0
    ? props.tasks
    : props.tasks.filter((task) => task.status != null && statuses.includes(task.status));

  return (
    <>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-2 sm:shrink-0'>
          <h2 className='font-heading text-h5 text-grey-800'>Tâches</h2>
          <p className='font-body text-body-m text-grey-600'>Par ordre de priorité</p>
        </div>
        <div className='flex w-full flex-col gap-4 sm:w-auto sm:min-w-0 sm:flex-row sm:items-center'>
          <Dropdown
            multiple
            placeholder='Statut'
            multiplePlaceholder='statuts'
            options={STATUS_OPTIONS}
            onChange={setStatuses}
            className='w-full sm:w-44 sm:shrink-0'
          />
          <SearchBar placeholder='Rechercher une tâche' className='w-full sm:w-71 sm:min-w-0' />
        </div>
      </div>

      {visible.length === 0 ? (
        <p className='font-body text-body-m text-grey-600'>
          {props.tasks.length === 0 ? 'Aucune tâche pour le moment.' : 'Aucune tâche pour ce filtre.'}
        </p>
      ) : (
        <div className='flex flex-col gap-4'>
          {visible.map(({ id, ...task }) => (
            <TaskInfo key={id} {...task} />
          ))}
        </div>
      )}
    </>
  );
}
