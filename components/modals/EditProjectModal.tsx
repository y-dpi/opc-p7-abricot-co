import Button from '../Button';
import Dropdown from '../Dropdown';
import Input from '../Input';
import Modal from '../Modal';

// @TODO placeholder project being edited (fetch project later).
const PROJECT = {
  title: 'Nom du projet',
  description: 'Développement de la nouvelle version de l\'API REST avec authentification JWT',
  contributors: ['Alice Dupont', 'Bertrand Legrand', 'Anne Bournes', 'Camille Vidal'],
  selectedContributors: ['Alice Dupont', 'Bertrand Legrand'] // @TODO use multiple initial selection in dropdown.
};

// Edit-project modal component.
export default function EditProjectModal() {
  return (
    <Modal
      mock
      title='Modifier un projet'
      bottom={
        <div className='h-13 w-45'>
          <Button label='Enregistrer' disabled />
        </div>
      }
    >
      <div className='flex flex-col gap-6'>
        <Input label='Titre*' value={PROJECT.title} />
        <Input label='Description*' value={PROJECT.description} />
        <Dropdown
          label='Contributeurs'
          placeholder='Choisir un ou plusieurs collaborateurs'
          options={PROJECT.contributors}
          value={PROJECT.selectedContributors}
          multiple
          multiplePlaceholder='collaborateurs'
        />
      </div>
    </Modal>
  );
}
