import CalendarPrimary from '../../../../assets/images/calendar-icon-primary.svg';
import CheckboxPrimary from '../../../../assets/images/checkbox-icon-primary.svg';
import AIButton from '../../../../components/AIButton';
import Button from '../../../../components/Button';
import Chips from '../../../../components/Chips';
import ColoredIcon from '../../../../components/ColoredIcon';
import Dropdown from '../../../../components/Dropdown';
import IconButton from '../../../../components/IconButton';
import Link from '../../../../components/Link';
import SearchBar from '../../../../components/SearchBar';
import Tag from '../../../../components/Tag';
import TaskInfo from '../../../../components/TaskInfo';
import UserIcon from '../../../../components/UserIcon';

// @TODO placeholder logged user initials (fetch current user later).
const LOGGED_USER_INITIALS = 'AD';

// @TODO placeholder project (fetch by id later).
const PROJECT = {
  name: 'Nom du projet',
  description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
  contributors: [
    { initials: 'AD', name: 'Propriétaire', owner: true },
    { initials: 'BD', name: 'Bertrand Dupont', owner: false },
    { initials: 'AD', name: 'Anne Dupont', owner: false }
  ]
};

// @TODO placeholder assigned tasks (fetch later).
const TASKS = [
  { title: 'Authentification JWT', description: 'Implémenter le système d\'authentification avec tokens JWT', status: 'todo' as const,
    date: '9 mars', assignees: [{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }], commentsCount: 1,
    comments: [{ initials: 'BD', author: 'Bertrand Dupont', timestamp: '23 mars, 11:20', text: 'Attention à bien gérer l’expiration des tokens et le refresh automatique côté client.' }] },
  { title: 'Authentification JWT', description: 'Implémenter le système d\'authentification avec tokens JWT', status: 'in-progress' as const,
    date: '9 mars', assignees: [{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }], commentsCount: 0 },
  { title: 'Authentification JWT', description: 'Implémenter le système d\'authentification avec tokens JWT', status: 'done' as const,
    date: '9 mars', assignees: [{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }], commentsCount: 0 },
  { title: 'Authentification JWT', description: 'Implémenter le système d\'authentification avec tokens JWT', status: 'todo' as const,
    date: '9 mars', assignees: [{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }], commentsCount: 0 },
  { title: 'Authentification JWT', description: 'Implémenter le système d\'authentification avec tokens JWT', status: 'in-progress' as const,
    date: '9 mars', assignees: [{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }], commentsCount: 0 },
  { title: 'Authentification JWT', description: 'Implémenter le système d\'authentification avec tokens JWT', status: 'done' as const,
    date: '9 mars', assignees: [{ initials: 'BD', name: 'Bertrand Dupont' }, { initials: 'AD', name: 'Anne Dupont' }], commentsCount: 1,
    comments: [{ initials: 'BD', author: 'Bertrand Dupont', timestamp: '23 mars, 11:20', text: 'Attention à bien gérer l’expiration des tokens et le refresh automatique côté client.' }] },
];

// Single project page.
export default function ProjectDetailPage() {
  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-28'>
      <div className='flex flex-col gap-8'>

        {/* Heading */}
        <div className='flex items-start gap-4'>
          <div className='h-14 w-14 shrink-0'>
            <IconButton icon='back' />
          </div>
          <div className='hidden md:flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <h1 className='font-heading text-h4 text-grey-800'>{PROJECT.name}</h1>
              <Link label='Modifier' href='#' />
            </div>
            <p className='font-body text-body-l text-grey-600'>{PROJECT.description}</p>
          </div>
          <div className='flex ml-auto flex-row items-end gap-3'>
            <div className='h-13 w-full sm:w-43 min-w-22 max-w-43'>
              <Button label='Créer une tâche' />
            </div>
            <div className='h-13 w-24'>
              <AIButton value='IA' />
            </div>
          </div>
        </div>

        {/* Mobile title */}
        <div className='flex md:hidden flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='font-heading text-h4 text-grey-800'>{PROJECT.name}</h1>
            <Link label='Modifier' href='#' />
          </div>
          <p className='font-body text-body-l text-grey-600'>{PROJECT.description}</p>
        </div>

        {/* Contributors */}
        <section className='flex flex-wrap items-center justify-between gap-6 rounded-xl bg-grey-100 md:px-13 px-5 py-5'>
          <div className='flex flex-col sm:flex-row items-center gap-2 mx-auto sm:mx-0'>
            <h2 className='font-heading text-h5 text-grey-800'>Contributeurs</h2>
            <span className='font-body text-body-m text-grey-600'>{PROJECT.contributors.length} personnes</span>
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            {PROJECT.contributors.map((contributor, index) => (
              <div key={`${index}-${contributor.initials}`} className='flex items-center gap-1'>
                <UserIcon
                  initials={contributor.initials}
                  size='sm'
                  className={contributor.owner ? 'h-7 w-7' : 'h-7 w-7 bg-grey-200 text-grey-950 ring-2 ring-white'}
                />
                <Tag color={contributor.owner ? 'brand' : 'grey'} label={contributor.name} />
              </div>
            ))}
          </div>
        </section>

        {/* Tasks card */}
        <section className='flex flex-col gap-10 rounded-xl border border-grey-200 bg-white px-5 md:px-15 py-10'>
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-heading text-h5 text-grey-800'>Tâches</h2>
              <p className='font-body text-body-m text-grey-600'>Par ordre de priorité</p>
            </div>
            <div className='flex flex-wrap items-center gap-4'>
              <Chips className='w-fit h-fit' label='Liste' active icon={<ColoredIcon src={CheckboxPrimary} color='var(--color-brand-dark)' />} />
              <Chips className='w-fit h-fit border border-grey-200' label='Calendrier' icon={<ColoredIcon src={CalendarPrimary} color='var(--color-brand-dark)' />} />
              <Dropdown
                multiple
                placeholder='Statut'
                multiplePlaceholder='statuts'
                options={['À faire', 'En cours', 'Terminée']}
                className='w-full sm:w-44'
              />
              <SearchBar placeholder='Rechercher une tâche' className='w-full sm:w-71' />
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {TASKS.map((task, index) => (
              <TaskInfo
                key={index}
                title={task.title}
                description={task.description}
                status={task.status}
                dueDate={task.date}
                assignees={task.assignees}
                commentsCount={task.commentsCount}
                comments={task.comments}
                currentUserInitials={LOGGED_USER_INITIALS}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
