import { createProject } from '../../../actions/projects';
import CalendarPrimary from '../../../assets/images/calendar-icon-primary.svg';
import CheckboxPrimary from '../../../assets/images/checkbox-icon-primary.svg';
import SearchIcon from '../../../assets/images/search-icon-black.svg';
import Chips from '../../../components/Chips';
import ColoredIcon from '../../../components/ColoredIcon';
import CreateProjectControl from '../../../components/CreateProjectControl';
import TaskCard from '../../../components/TaskCard';
import { requireSession } from '../../../middleware/session';
import { getAssignedTasks } from '../../../models/tasks';
import { formatDate, toUiStatus } from '../../../utils/task';

// Dashboard page.
export default async function DashboardPage() {
  const { token, user } = await requireSession();
  const userName = user.name ?? user.email;

  const body = await getAssignedTasks(token);
  const tasks = body.success && body.data?.tasks ? body.data.tasks : [];

  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-25'>
      <div className='flex flex-col gap-8'>

        {/* Heading */}
        <div className='flex flex-col gap-4'>
          <h1 className='font-heading text-h4 text-grey-800'>Tableau de bord</h1>
          <p className='font-body text-body-l text-grey-950'>
            Bonjour {userName}, voici un aperçu de vos projets et tâches
          </p>
        </div>

        {/* Toolbar */}
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <Chips label='Liste' active icon={<ColoredIcon src={CheckboxPrimary} color='var(--color-brand-dark)' />} />
            <Chips label='Kanban' href='/dashboard/kanban' icon={<ColoredIcon src={CalendarPrimary} color='var(--color-brand-dark)' />} className='border border-grey-200' />
          </div>
          <CreateProjectControl action={createProject} />
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

          {tasks.length === 0 ? (
            <p className='font-body text-body-m text-grey-600'>Aucune tâche assignée.</p>
          ) : (
            <div className='flex flex-col gap-4'>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  status={toUiStatus(task.status)}
                  title={task.title}
                  description={task.description ?? ''}
                  projectName={task.project?.name ?? 'Projet'}
                  date={formatDate(task.dueDate)}
                  commentsCount={task.comments?.length ?? 0}
                  href={`/projects/${task.projectId}`}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
