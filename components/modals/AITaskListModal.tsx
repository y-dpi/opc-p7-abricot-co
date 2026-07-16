import AITaskCard from '../AITaskCard';
import Button from '../Button';
import Modal from '../Modal';
import PromptBar from './PromptBar';

// @TODO placeholder AI-generated tasks (fetch/generate later).
const TASKS = [
  { title: 'Nom de la tâche', description: 'Description de la tâche' },
  { title: 'Nom de la tâche', description: 'Description de la tâche' },
  { title: 'Nom de la tâche', description: 'Description de la tâche' }
];

// AI task-list modal component.
export default function AITaskListModal() {
  return (
    <Modal
      mock
      title='Vos tâches...'
      bottom={
        <div className='flex flex-col items-center gap-6'>
          <div className='h-13 w-50'>
            <Button label='+ Ajouter les tâches' />
          </div>
          <hr className='w-full border-grey-200' />
          <PromptBar placeholder='Décrivez les tâches que vous souhaitez ajouter...' />
        </div>
      }
      showStar
    >
      <div className='flex flex-col gap-6'>
        {TASKS.map((task, index) => (
          <AITaskCard key={index} title={task.title} description={task.description} />
        ))}
      </div>
    </Modal>
  );
}
