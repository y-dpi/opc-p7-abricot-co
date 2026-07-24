'use client';

import { useState, useTransition } from 'react';

import type { FormAction } from '../utils/formState';
import Button from './Button';
import CreateProjectModal from './modals/CreateProjectModal';

// Button that opens the create-project modal and runs the create action.
export default function CreateProjectControl(props: { action: FormAction }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  // Run the create action, then close on success (it usually redirects).
  function submit(formData: FormData) {
    startTransition(async () => {
      const result = await props.action(undefined, formData);
      if (result?.ok) setOpen(false);
      else setError(result?.error);
    });
  }

  return (
    <>
      <div className='h-13 w-45'>
        <Button type='button' label='+ Créer un projet' onClick={() => setOpen(true)} />
      </div>
      {open && (
        <CreateProjectModal
          formAction={submit}
          pending={pending}
          error={error}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
