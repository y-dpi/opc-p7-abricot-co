import NextLink from 'next/link';

import { createProject } from '../../../actions/projects';
import CreateProjectControl from '../../../components/CreateProjectControl';
import ProjectCard from '../../../components/ProjectCard';
import { requireSession } from '../../../middleware/session';
import { getProjects } from '../../../models/projects';
import toInitials from '../../../utils/toInitials';

// Projects page.
export default async function ProjectsPage() {
  const { token } = await requireSession();
  const body = await getProjects(token);
  const projects = body.success && body.data?.projects ? body.data.projects : [];

  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-34'>
      <div className='flex flex-col gap-8'>

        {/* Heading */}
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className='font-heading text-h4 text-grey-800'>Mes projets</h1>
            <p className='font-body text-body-l text-grey-950'>Gérez vos projets</p>
          </div>
          <CreateProjectControl action={createProject} />
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <p className='font-body text-body-m text-grey-600'>Aucun projet pour le moment.</p>
        ) : (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {projects.map((project) => {
              const tasks = project.tasks ?? [];
              const tasksTotal = project._count?.tasks ?? tasks.length;
              const tasksDone = tasks.filter((task) => task.status === 'DONE').length;
              const progress = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;
              const members = project.members.filter((member) => member.userId !== project.ownerId);
              const teamSize = new Set([project.ownerId, ...project.members.map((member) => member.userId)]).size;

              return (
                <NextLink key={project.id} href={`/projects/${project.id}`}>
                  <ProjectCard
                    name={project.name}
                    description={project.description ?? ''}
                    progress={progress}
                    tasksDone={tasksDone}
                    tasksTotal={tasksTotal}
                    teamSize={teamSize}
                    owner={toInitials(project.owner.name, project.owner.email)}
                    members={members.map((member) => toInitials(member.user.name, member.user.email))}
                  />
                </NextLink>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
