'use client';

import { useState, useTransition } from 'react';

import type { FormAction } from '../utils/formState';
import Button from './Button';
import CreateTaskModal from './modals/CreateTaskModal';

// Button that opens the create-task modal and runs the create action.
export default function CreateTaskControl(props: {
  action: FormAction,
  members: { label: string, value: string }[],
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();

  // Run the create action, then close on success.
  function submit(formData: FormData) {
    startTransition(async () => {
      const result = await props.action(undefined, formData);
      if (result?.ok) setOpen(false);
      else setError(result?.error);
    });
  }

  return (
    <>
      <div className='h-13 w-full sm:w-43 min-w-22 max-w-43'>
        <Button type='button' label='Créer une tâche' onClick={() => setOpen(true)} />
      </div>
      {open && (
        <CreateTaskModal
          members={props.members}
          formAction={submit}
          pending={pending}
          error={error}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
