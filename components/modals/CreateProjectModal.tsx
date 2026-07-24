'use client';

import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

// Create-project modal component.
export default function CreateProjectModal(props: {
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
        title='Créer un projet'
        bottom={<div className='h-13 w-45'><Button label='Ajouter un projet' disabled /></div>}
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre*' />
          <Input label='Description*' />
          <Input label='Contributeurs' placeholder='Emails séparés par des virgules' />
        </div>
      </Modal>
    );
  }

  return (
    <form action={props.formAction}>
      <Modal
        title='Créer un projet'
        onClose={props.onClose}
        bottom={
          <div className='flex flex-col gap-4'>
            {props.error && <p className='font-body text-body-s text-error'>{props.error}</p>}
            <div className='h-13 w-45'>
              <Button type='submit' label={props.pending ? 'Ajout…' : 'Ajouter un projet'} disabled={props.pending} />
            </div>
          </div>
        }
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre*' name='name' />
          <Input label='Description*' name='description' />
          <Input label='Contributeurs' name='contributors' placeholder='Emails séparés par des virgules' />
        </div>
      </Modal>
    </form>
  );
}
