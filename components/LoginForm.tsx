'use client';

import { useActionState } from 'react';

import { login } from '../actions/auth';
import Button from './Button';
import Input from './Input';

// Login form component.
export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className='flex w-full flex-col gap-8'>
      <div className='flex w-full flex-col gap-7'>
        <Input label='Email' name='email' type='email' />
        <Input label='Mot de passe' name='password' type='password' />
      </div>
      {state?.error && <p className='font-body text-body-s text-error self-stretch'>{state.error}</p>}
      <div className='h-13 w-[80%] self-center'>
        <Button label={pending ? 'Connexion…' : 'Se connecter'} disabled={pending} />
      </div>
    </form>
  );
}
