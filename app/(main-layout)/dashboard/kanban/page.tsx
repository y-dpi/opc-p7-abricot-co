import { createProject } from '../../../../actions/projects';
import CalendarPrimary from '../../../../assets/images/calendar-icon-primary.svg';
import CheckboxPrimary from '../../../../assets/images/checkbox-icon-primary.svg';
import Chips from '../../../../components/Chips';
import ColoredIcon from '../../../../components/ColoredIcon';
import CreateProjectControl from '../../../../components/CreateProjectControl';
import Tag from '../../../../components/Tag';
import TaskCard from '../../../../components/TaskCard';
import { requireSession } from '../../../../middleware/session';
import { getAssignedTasks } from '../../../../models/tasks';
import { formatDate, toUiStatus } from '../../../../utils/task';

// Dashboard page (kanban).
export default async function KanbanPage() {
  const { token, user } = await requireSession();
  const userName = user.name ?? user.email;

  const body = await getAssignedTasks(token);
  const tasks = body.success && body.data?.tasks ? body.data.tasks : [];

  // Sort tasks into columns by status.
  const columns = [
    { title: 'À faire', status: 'todo' as const },
    { title: 'En cours', status: 'in-progress' as const },
    { title: 'Terminées', status: 'done' as const },
  ].map((column) => ({
    ...column,
    tasks: tasks.filter((task) => toUiStatus(task.status) === column.status),
  }));

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
            <Chips label='Liste' href='/dashboard' icon={<ColoredIcon src={CheckboxPrimary} color='var(--color-brand-dark)' />} className='border border-grey-200' />
            <Chips label='Kanban' active icon={<ColoredIcon src={CalendarPrimary} color='var(--color-brand-dark)' />} />
          </div>
          <CreateProjectControl action={createProject} />
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
                {column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    status={column.status}
                    title={task.title}
                    description={task.description ?? ''}
                    projectName={task.project?.name ?? 'Projet'}
                    date={formatDate(task.dueDate)}
                    commentsCount={task.comments?.length ?? 0}
                    href={`/projects/${task.projectId}`}
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
