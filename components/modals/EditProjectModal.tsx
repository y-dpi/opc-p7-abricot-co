'use client';

import Button from '../Button';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Modal from '../Modal';

// Edit-project modal component.
export default function EditProjectModal(props: {
  name?: string,
  description?: string,
  members?: string[],
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
        title='Modifier un projet'
        bottom={<div className='h-13 w-45'><Button label='Enregistrer' disabled /></div>}
      >
        <div className='flex flex-col gap-6'>
          <Input label='Titre*' value='Nom du projet' />
          <Input label='Description*' value='Développement de la nouvelle version de l&apos;API REST' />
          <Input label='Contributeurs' placeholder='Emails séparés par des virgules' />
        </div>
      </Modal>
    );
  }

  return (
    <form action={props.formAction}>
      <Modal
        title='Modifier un projet'
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
          <Input label='Titre*' name='name' value={props.name} />
          <Input label='Description*' name='description' value={props.description} />
          {props.members && props.members.length > 0 && (
            <Dropdown
              label='Contributeurs actuels'
              value={props.members}
              options={props.members}
              multiple
              multiplePlaceholder='contributeurs'
              placeholder='Aucun contributeur'
            />
          )}
          <Input label='Ajouter des contributeurs' name='contributors' placeholder='Emails séparés par des virgules' />
        </div>
      </Modal>
    </form>
  );
}
