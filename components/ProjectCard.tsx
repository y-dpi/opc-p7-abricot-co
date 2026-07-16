import Image from 'next/image';

import PeopleGrey from '../assets/images/people-icon-grey.svg';
import Tag from './Tag';
import UserIcon from './UserIcon';

// Project card component.
export default function ProjectCard(props: {
  name?: string,
  description?: string,
  progress?: number,
  tasksDone?: number,
  tasksTotal?: number,
  teamSize?: number,
  owner?: string,
  members?: string[]
}) {
  const name = props.name ?? 'Projet sans nom';
  const description = props.description ?? '';
  const progress = props.progress ?? 0;
  const tasksDone = props.tasksDone ?? 0;
  const tasksTotal = props.tasksTotal ?? 0;
  const teamSize = props.teamSize ?? 0;
  const owner = props.owner ?? '??';
  const members = props.members ?? [];

  return (
    <article className='flex flex-col gap-14 w-full rounded-xl border border-grey-200 bg-white px-9 py-8'>

      {/* Header */}
      <div className='flex flex-col gap-2'>
        <h3 className='font-heading text-h5 text-grey-800'>{name}</h3>
        <p className='font-body text-body-s text-grey-600'>{description}</p>
      </div>

      {/* Progression */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <span className='font-body text-body-xs text-grey-600'>Progression</span>
          <span className='font-body text-body-xs text-grey-800'>{progress}%</span>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='h-2 w-full overflow-hidden rounded-full bg-grey-200'>
            <div className='h-full rounded-full bg-brand-dark' style={{ width: `${progress}%` }} />
          </div>
          <span className='font-body text-body-2xs text-grey-600'>{tasksDone}/{tasksTotal} tâches terminées</span>
        </div>
      </div>

      {/* Team */}
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <Image className='w-3 h-3' alt='' src={PeopleGrey} />
          <span className='font-body text-body-2xs text-grey-600'>Équipe ({teamSize})</span>
        </div>
        <div className='flex items-center gap-1 overflow-x-scroll scrollbar-none'>
          <div className='flex items-center gap-1'>
            <UserIcon initials={owner} size='sm' className='w-7 h-7' />
            <Tag color='brand' label='Propriétaire' />
          </div>
          <div className='flex items-center -space-x-2'>
            {members.map((member, index) => (
              <UserIcon
                key={`${index}-${member}`}
                initials={member}
                size='sm'
                className='w-7 h-7 bg-grey-200 text-grey-950 ring-2 ring-white'
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
