'use client';

import { useActionState } from 'react';

import { register } from '../actions/auth';
import Button from './Button';
import Input from './Input';

// Register form component.
export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, undefined);

  return (
    <form action={formAction} className='flex w-full flex-col items-center gap-8'>
      <div className='flex w-full flex-col gap-7'>
        <Input label='Email' name='email' type='email' />
        <Input label='Mot de passe' name='password' type='password' />
      </div>
      {state?.error && <p className='font-body text-body-s text-error self-stretch'>{state.error}</p>}
      <div className='h-13 w-[80%] self-center'>
        <Button label={pending ? 'Inscription…' : 'S’inscrire'} disabled={pending} />
      </div>
    </form>
  );
}
