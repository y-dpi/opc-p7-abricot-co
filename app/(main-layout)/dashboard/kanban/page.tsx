import CalendarPrimary from '../../../../assets/images/calendar-icon-primary.svg';
import CheckboxPrimary from '../../../../assets/images/checkbox-icon-primary.svg';
import Button from '../../../../components/Button';
import Chips from '../../../../components/Chips';
import ColoredIcon from '../../../../components/ColoredIcon';
import Tag from '../../../../components/Tag';
import TaskCard from '../../../../components/TaskCard';

// @TODO placeholder greeting name (fetch current user later).
const USER_NAME = 'Alice Dupont';

// @TODO placeholder assigned tasks (fetch later).
const TASKS = [
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'todo' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'in-progress' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'in-progress' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'done' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'todo' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'in-progress' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
  { title: 'Nom de la tâche', description: 'Description de la tâche', status: 'done' as const, projectName: 'Nom du projet', date: '9 mars', commentsCount: 2 },
];

// Sort tasks by status.
const columns = [
  { title: 'À faire', tasks: TASKS.filter(task => task.status === 'todo') },
  { title: 'En cours', tasks: TASKS.filter(task => task.status === 'in-progress') },
  { title: 'Terminées', tasks: TASKS.filter(task => task.status === 'done') }
];

// Dashboard page (kanban).
export default function KanbanPage() {
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
            <Chips label='Liste' href='/dashboard' icon={<ColoredIcon src={CheckboxPrimary} color='var(--color-brand-dark)' />} className='border border-grey-200' />
            <Chips label='Kanban' active icon={<ColoredIcon src={CalendarPrimary} color='var(--color-brand-dark)' />} />
          </div>
          <div className='h-13 w-45'>
            <Button label='+ Créer un projet' />
          </div>
        </div>

        {/* Columns */}
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start'>
          {columns.map((column) => (
            <section
              key={column.title}
              className='flex flex-1 flex-col gap-10 rounded-xl border border-grey-200 bg-white px-6 py-10'
            >
              <div className='flex items-center gap-2'>
                <h2 className='font-heading text-h5 text-grey-800'>{column.title}</h2>
                <Tag color='grey' label={String(column.tasks.length)} />
              </div>
              <div className='flex flex-col gap-4'>
                {column.tasks.map((task, index) => (
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
          ))}
        </div>
      </div>
    </main>
  );
}
