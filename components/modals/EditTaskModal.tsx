'use client';

import Button from '../Button';
import DateField from '../DateField';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Modal from '../Modal';
import StatusSelector, { type TaskStatus } from '../StatusSelector';

// Member option shown in the assignee dropdown.
type Member = { label: string, value: string };

// Edit-task modal component.
export default function EditTaskModal(props: {
  title?: string,
  description?: string,
  dueDate?: Date,
  status?: TaskStatus,
  members?: Member[],
  assigneeIds?: string[],
  formAction?: (formData: FormData) => void,
  pending?: boolean,
  error?: string,
  onClose?: () => void,
  onDelete?: () => void,
  deleting?: boolean,
}) {

  // Preview mode for the component gallery.
  if (!props.formAction) {
    return (
      <Modal
        mock
        title='Modifier'
        bottom={<div className='h-13 w-61'><Button label='Enregistrer' disabled /></div>}
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre' value='Authentification JWT' />
          <Input label='Description' value='Implémenter le système d&apos;authentification' />
          <DateField label='Échéance' value={new Date(2026, 2, 9)} />
          <StatusSelector value='todo' />
        </div>
      </Modal>
    );
  }

  return (
    <form action={props.formAction}>
      <Modal
        title='Modifier'
        onClose={props.onClose}
        bottom={
          <div className='flex flex-col gap-4'>
            {props.error && <p className='font-body text-body-s text-error'>{props.error}</p>}
            <div className='flex flex-wrap items-center gap-4'>
              <div className='h-13 w-45'>
                <Button type='submit' label={props.pending ? 'Enregistrement…' : 'Enregistrer'} disabled={props.pending} />
              </div>
              <div className='h-13 w-45'>
                <Button label={props.deleting ? 'Suppression…' : 'Supprimer'} variant='outline' onClick={props.onDelete} disabled={props.deleting} />
              </div>
            </div>
          </div>
        }
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre' name='title' value={props.title} />
          <Input label='Description' name='description' value={props.description} />
          <DateField label='Échéance' name='dueDate' value={props.dueDate} />
          <Dropdown
            label='Assigné à :'
            name='assigneeIds'
            placeholder='Choisir un ou plusieurs collaborateurs'
            options={props.members ?? []}
            value={props.assigneeIds}
            multiple
            multiplePlaceholder='collaborateurs'
          />
          <StatusSelector name='status' value={props.status} />
        </div>
      </Modal>
    </form>
  );
}
