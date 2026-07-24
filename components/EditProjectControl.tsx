'use client';

import { useState, useTransition } from 'react';

import type { FormAction } from '../utils/formState';
import EditProjectModal from './modals/EditProjectModal';

// "Modifier" link that opens the edit-project modal (update and delete).
export default function EditProjectControl(props: {
  name: string,
  description: string,
  members: string[],
  updateAction: FormAction,
  deleteAction: () => Promise<void>,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const [deleting, startDelete] = useTransition();

  // Run the update action, then close on success.
  function submit(formData: FormData) {
    startTransition(async () => {
      const result = await props.updateAction(undefined, formData);
      if (result?.ok) setOpen(false);
      else setError(result?.error);
    });
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='font-body text-body-s underline text-brand-dark cursor-pointer'
      >
        Modifier
      </button>
      {open && (
        <EditProjectModal
          name={props.name}
          description={props.description}
          members={props.members}
          formAction={submit}
          pending={pending}
          error={error}
          onClose={() => setOpen(false)}
          onDelete={() => startDelete(() => props.deleteAction())}
          deleting={deleting}
        />
      )}
    </>
  );
}
