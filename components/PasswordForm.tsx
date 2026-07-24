'use client';

import { useActionState } from 'react';

import type { FormAction } from '../utils/formState';
import Button from './Button';
import Input from './Input';

// Password change form (current password + new password).
export default function PasswordForm(props: {
  action: FormAction,
}) {
  const [state, formAction, pending] = useActionState(props.action, undefined);

  return (
    <form action={formAction} className='flex flex-col gap-6'>
      <Input label='Mot de passe actuel' type='password' name='currentPassword' />
      <Input label='Nouveau mot de passe' type='password' name='newPassword' />

      {state?.error && <p className='font-body text-body-s text-error'>{state.error}</p>}
      {state?.ok && <p className='font-body text-body-s text-brand-dark'>Mot de passe mis à jour.</p>}

      <div className='h-13 w-full max-w-61'>
        <Button type='submit' label={pending ? 'Enregistrement…' : 'Modifier le mot de passe'} disabled={pending} />
      </div>
    </form>
  );
}
