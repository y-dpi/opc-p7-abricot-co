import CalendarPrimary from '../../../assets/images/calendar-icon-primary.svg';
import CheckboxPrimary from '../../../assets/images/checkbox-icon-primary.svg';
import SearchIcon from '../../../assets/images/search-icon-black.svg';
import Button from '../../../components/Button';
import Chips from '../../../components/Chips';
import ColoredIcon from '../../../components/ColoredIcon';
import TaskCard from '../../../components/TaskCard';

// @TODO placeholder greeting name (fetch current user later).
const USER_NAME = 'Alice Dupont';

// @TODO placeholder assigned tasks (fetch later).
const TASKS = [
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'todo' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'in-progress' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'done' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'todo' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'in-progress' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'done' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
];

// Dashboard page.
export default function DashboardPage() {
  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-25'>
      <div className='flex flex-col gap-8'>

        {/* Heading */}
        <div className='flex flex-col gap-4'>
          <h1 className='font-heading text-h4 text-grey-800'>Tableau de bord</h1>
          <p className='font-body text-body-l text-grey-950'>
            Bonjour {USER_NAME}, voici un aperçu de vos projets et tâches
          </p>
        </div>

        {/* Toolbar */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <Chips label='Liste' active icon={<ColoredIcon src={CheckboxPrimary} color='var(--color-brand-dark)' />} />
            <Chips label='Kanban' href='/dashboard/kanban' icon={<ColoredIcon src={CalendarPrimary} color='var(--color-brand-dark)' />} className='border border-grey-200' />
          </div>
          <div className='h-13 w-45'>
            <Button label='+ Créer un projet' />
          </div>
        </div>

        {/* Task list card */}
        <section className='flex flex-col gap-10 rounded-xl border border-grey-200 bg-white px-6 lg:px-15 py-10'>
          <div className='flex flex-wrap items-center justify-between gap-6'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-heading text-h5 text-grey-800'>Mes tâches assignées</h2>
              <p className='font-body text-body-m text-grey-600'>Par ordre de priorité</p>
            </div>
            <div className='flex items-center justify-between gap-8 rounded-lg border border-grey-200 bg-white px-8 py-6 w-full lg:w-89'>
              <span className='font-body text-body-s text-grey-600'>Rechercher une tâche</span>
              <ColoredIcon src={SearchIcon} color='currentColor' className='h-3.5 w-3.5 text-grey-600' />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            {TASKS.map((task, index) => (
              <TaskCard
                key={index}
                status={task.status}
                title={task.title}
                description={task.description}
                projectName={task.projectName}
                date={task.date}
                commentsCount={task.commentsCount}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
