'use client';

import { useActionState } from 'react';

import type { FormAction } from '../utils/formState';
import Button from './Button';
import Input from './Input';

// Account details form (update profile).
export default function AccountForm(props: {
  name: string,
  email: string,
  action: FormAction,
}) {
  const [state, formAction, pending] = useActionState(props.action, undefined);

  return (
    <form action={formAction} className='flex flex-col gap-6'>
      <Input label="Nom d'utilisateur" name='name' value={props.name} />
      <Input label='Email' type='email' name='email' value={props.email} />

      {state?.error && <p className='font-body text-body-s text-error'>{state.error}</p>}
      {state?.ok && <p className='font-body text-body-s text-brand-dark'>Informations mises à jour.</p>}

      <div className='h-13 w-full max-w-61'>
        <Button type='submit' label={pending ? 'Enregistrement…' : 'Modifier les informations'} disabled={pending} />
      </div>
    </form>
  );
}
