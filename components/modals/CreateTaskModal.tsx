'use client';

import Button from '../Button';
import DateField from '../DateField';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Modal from '../Modal';

// Member option shown in the assignee dropdown.
type Member = { label: string, value: string };

// Create-task modal component.
export default function CreateTaskModal(props: {
  members?: Member[],
  formAction?: (formData: FormData) => void,
  pending?: boolean,
  error?: string,
  onClose?: () => void,
}) {

  // Preview mode for the component gallery.
  if (!props.formAction) {
    return (
      <Modal
        mock
        title='Créer une tâche'
        bottom={<div className='h-13 w-50'><Button label='+ Ajouter une tâche' disabled /></div>}
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre*' />
          <Input label='Description*' />
          <DateField label='Échéance' />
          <Dropdown
            label='Assigné à :'
            placeholder='Choisir un ou plusieurs collaborateurs'
            options={['Alice Dupont', 'Bertrand Legrand']}
            multiple
            multiplePlaceholder='collaborateurs'
          />
        </div>
      </Modal>
    );
  }

  return (
    <form action={props.formAction}>
      <Modal
        title='Créer une tâche'
        onClose={props.onClose}
        bottom={
          <div className='flex flex-col gap-4'>
            {props.error && <p className='font-body text-body-s text-error'>{props.error}</p>}
            <div className='h-13 w-50'>
              <Button type='submit' label={props.pending ? 'Ajout…' : '+ Ajouter une tâche'} disabled={props.pending} />
            </div>
          </div>
        }
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre*' name='title' />
          <Input label='Description*' name='description' />
          <DateField label='Échéance' name='dueDate' />
          <Dropdown
            label='Assigné à :'
            name='assigneeIds'
            placeholder='Choisir un ou plusieurs collaborateurs'
            options={props.members ?? []}
            multiple
            multiplePlaceholder='collaborateurs'
          />
        </div>
      </Modal>
    </form>
  );
}
