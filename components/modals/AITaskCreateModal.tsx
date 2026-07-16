import Modal from '../Modal';
import PromptBar from './PromptBar';

// AI task-creation modal component.
export default function AITaskCreateModal() {
  return (
    <Modal
      mock
      title='Créer une tâche'
      bottom={<PromptBar placeholder='Décrivez les tâches que vous souhaitez ajouter...' />}
      showStar
    >
      <div className='min-h-80' />
    </Modal>
  );
}
