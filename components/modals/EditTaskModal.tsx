import Button from '../Button';
import DateField from '../DateField';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Modal from '../Modal';
import StatusSelector, { type TaskStatus } from '../StatusSelector';

// @TODO placeholder task being edited (fetch task later).
const TASK = {
  title: 'Authentification JWT',
  description: 'Implémenter le système d\'authentification avec tokens JWT',
  dueDate: new Date(2026, 2, 9),
  assignees: ['Alice Dupont', 'Bertrand Legrand', 'Anne Bournes', 'Camille Vidal'],
  selectedAssignees: ['Alice Dupont', 'Bertrand Legrand'],
  status: 'todo' as TaskStatus
};

// Edit-task modal component.
export default function EditTaskModal() {
  return (
    <Modal
      mock
      title='Modifier'
      bottom={
        <div className='h-13 w-61'>
          <Button label='Enregistrer' disabled />
        </div>
      }
    >
      <div className='flex flex-col gap-6'>
        <Input label='Titre' value={TASK.title} />
        <Input label='Description' value={TASK.description} />
        <DateField label='Échéance' value={TASK.dueDate} />
        <Dropdown
          label='Assigné à :'
          placeholder='Choisir un ou plusieurs collaborateurs'
          options={TASK.assignees}
          value={TASK.selectedAssignees}
          multiple
          multiplePlaceholder='collaborateurs'
        />
        <StatusSelector value={TASK.status} />
      </div>
    </Modal>
  );
}
