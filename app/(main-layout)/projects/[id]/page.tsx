import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createComment, deleteComment } from '../../../../actions/comments';
import { deleteProject, updateProject } from '../../../../actions/projects';
import { createTask, deleteTask, updateTask } from '../../../../actions/tasks';
import AIButton from '../../../../components/AIButton';
import CreateTaskControl from '../../../../components/CreateTaskControl';
import EditProjectControl from '../../../../components/EditProjectControl';
import IconButton from '../../../../components/IconButton';
import ProjectTasks from '../../../../components/ProjectTasks';
import Tag from '../../../../components/Tag';
import UserIcon from '../../../../components/UserIcon';
import { requireSession } from '../../../../middleware/session';
import { getProject } from '../../../../models/projects';
import { getTasks } from '../../../../models/tasks';
import { SEARCH_PARAM, searchByRelevance, toSearchQuery } from '../../../../utils/search';
import { formatDate, formatDateTime, toDate, toUiStatus } from '../../../../utils/task';
import toInitials from '../../../../utils/toInitials';

export const metadata: Metadata = { title: 'Détails du projet' };

// Single project page.
export default async function ProjectDetailPage({ params, searchParams }: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params;
  const query = toSearchQuery((await searchParams)[SEARCH_PARAM]);
  const { token, user } = await requireSession();

  // Manually get task information for shallow tasks.
  // - getProject returns the project with shallow tasks.
  // - getTasks returns the tasks with their assignees and comments.
  const [projectBody, tasksBody] = await Promise.all([getProject(token, id), getTasks(token, id)]);
  if (!projectBody.success || !projectBody.data?.project) notFound();

  const project = projectBody.data.project;
  const currentInitials = toInitials(user.name, user.email);
  const allTasks = tasksBody.success && tasksBody.data?.tasks ? tasksBody.data.tasks : [];

  // Apply frontend search.
  const tasks = searchByRelevance(allTasks, query, (task) => ({
    title: task.title,
    description: task.description,
  }));

  // Only an admin may edit or delete the project.
  const role = project.userRole
    ?? project.members.find((member) => member.userId === user.id)?.role;
  const isAdmin = role === 'ADMIN' || project.ownerId === user.id;

  // Current contributors (owner excluded) shown in the edit-project modal.
  const contributors = project.members.filter((member) => member.userId !== project.ownerId);
  const contributorOptions = contributors.map((member) => ({
    label: member.user.name ?? member.user.email,
    value: member.user.id,
  }));
  const contributorIds = contributors.map((member) => member.user.id);

  // Assignee options for the task modals.
  const ownerLabel = project.owner.name ?? project.owner.email;
  const memberOptions = [{ label: ownerLabel, value: project.owner.id }, ...contributorOptions];

  // Filtered task items.
  const taskItems = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description ?? '',
    status: toUiStatus(task.status),
    dueDate: formatDate(task.dueDate),
    dueDateValue: toDate(task.dueDate),
    commentsCount: task.comments?.length ?? 0,
    assignees: (task.assignees ?? []).map((assignee) => ({
      initials: toInitials(assignee.user.name, assignee.user.email),
      name: assignee.user.name ?? assignee.user.email,
    })),
    comments: (task.comments ?? []).map((comment) => ({
      id: comment.id,
      initials: toInitials(comment.author.name, comment.author.email),
      author: comment.author.name ?? comment.author.email,
      timestamp: formatDateTime(comment.createdAt),
      text: comment.content,
      deleteAction: deleteComment.bind(null, project.id, task.id, comment.id),
    })),
    currentUserInitials: currentInitials,
    members: memberOptions,
    assigneeIds: (task.assignees ?? []).map((assignee) => assignee.user.id),
    updateAction: updateTask.bind(null, project.id, task.id),
    deleteAction: deleteTask.bind(null, project.id, task.id),
    commentAction: createComment.bind(null, project.id, task.id),
  }));

  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-28'>
      <div className='flex flex-col gap-8'>

        {/* Heading */}
        <div className='flex items-start gap-4'>
          <div className='h-14 w-14 shrink-0'>
            <IconButton icon='back' label='Retour aux projets' href='/projects' />
          </div>
          <div className='hidden md:flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
              <h1 className='font-heading text-h4 text-grey-800'>{project.name}</h1>
              {isAdmin && (
                <EditProjectControl
                  name={project.name}
                  description={project.description ?? ''}
                  members={contributorOptions}
                  updateAction={updateProject.bind(null, project.id, contributorIds)}
                  deleteAction={deleteProject.bind(null, project.id)}
                />
              )}
            </div>
            <p className='font-body text-body-l text-grey-600'>{project.description}</p>
          </div>
          <div className='flex ml-auto flex-row items-end gap-3'>
            <CreateTaskControl action={createTask.bind(null, project.id)} members={memberOptions} />
            <div className='h-13 w-24'>
              <AIButton value='IA' />
            </div>
          </div>
        </div>

        {/* Mobile title */}
        <div className='flex md:hidden flex-col gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='font-heading text-h4 text-grey-800'>{project.name}</h1>
            {isAdmin && (
              <EditProjectControl
                name={project.name}
                description={project.description ?? ''}
                members={contributorOptions}
                updateAction={updateProject.bind(null, project.id, contributorIds)}
                deleteAction={deleteProject.bind(null, project.id)}
              />
            )}
          </div>
          <p className='font-body text-body-l text-grey-600'>{project.description}</p>
        </div>

        {/* Contributors */}
        <section className='flex flex-wrap flex-col sm:flex-row items-center justify-between gap-6 rounded-xl bg-grey-100 md:px-13 px-5 py-5'>
          <div className='flex flex-col sm:flex-row items-center gap-2 mx-auto sm:mx-0'>
            <h2 className='font-heading text-h5 text-grey-800'>Contributeurs</h2>
            <span className='font-body text-body-m text-grey-600'>{contributors.length + 1} personnes</span>
          </div>
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <div className='flex items-center gap-1'>
              <UserIcon
                initials={toInitials(project.owner.name, project.owner.email)}
                size='sm'
                className='h-7 w-7'
              />
              <Tag color='brand' label='Propriétaire' />
            </div>
            {contributors.map((member) => (
              <div key={member.id} className='flex items-center gap-1'>
                <UserIcon
                  initials={toInitials(member.user.name, member.user.email)}
                  size='sm'
                  className='h-7 w-7 bg-grey-200 text-grey-950 ring-2 ring-white'
                />
                <Tag color='grey' label={member.user.name ?? member.user.email} />
              </div>
            ))}
          </div>
        </section>

        {/* Tasks card */}
        <section className='flex flex-col gap-10 rounded-xl border border-grey-200 bg-white px-5 md:px-15 py-10'>
          <ProjectTasks tasks={taskItems} query={query} />
        </section>
      </div>
    </main>
  );
}
