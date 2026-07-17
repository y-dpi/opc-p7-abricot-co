import Button from '../../../components/Button';
import ProjectCard from '../../../components/ProjectCard';

// @TODO placeholder projects (fetch later).
const PROJECTS = [
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
  { name: 'Nom du projet', description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
    progress: 0, tasksDone: 0, tasksTotal: 2, owner: 'AD', members: ['BD', 'CV'], teamSize: 3 },
];

// Projects page.
export default function ProjectsPage() {
  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-34'>
      <div className='flex flex-col gap-8'>

        {/* Heading */}
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div className='flex flex-col gap-4'>
            <h1 className='font-heading text-h4 text-grey-800'>Mes projets</h1>
            <p className='font-body text-body-l text-grey-950'>Gérez vos projets</p>
          </div>
          <div className='h-13 w-45'>
            <Button label='+ Créer un projet' />
          </div>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {PROJECTS.map((info, index) => (
            <ProjectCard
              key={index}
              name={info.name}
              description={info.description}
              progress={info.progress}
              tasksDone={info.tasksDone}
              tasksTotal={info.tasksTotal}
              teamSize={info.teamSize}
              owner={info.owner}
              members={info.members}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
