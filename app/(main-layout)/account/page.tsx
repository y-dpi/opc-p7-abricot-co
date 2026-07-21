import { logout } from '../../../actions/auth';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

// @TODO placeholder account details (fetch current user later).
const ACCOUNT = {
  name: 'Amélie Dupont',
  email: 'a.dupont@mail.com',
  password: '••••••••••••'
};

// Account page.
export default function AccountPage() {
  return (
    <main className='mx-auto w-full max-w-360 flex-1 px-6 py-16 lg:px-25'>
      <section className='flex flex-col gap-10 rounded-xl border border-grey-200 bg-white px-5 md:px-15 py-10'>

        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h1 className='font-heading text-h5 text-grey-800'>Mon compte</h1>
          <p className='font-body text-body-m text-grey-600'>{ACCOUNT.name}</p>
        </div>

        {/* Form */}
        <div className='flex flex-col gap-6'>
          <Input label='Nom' value={ACCOUNT.name} />
          <Input label='Email' type='email' value={ACCOUNT.email} />
          <Input label='Mot de passe' type='password' value={ACCOUNT.password} />
        </div>

        <div className='flex flex-wrap items-center gap-4'>
          <div className='h-13 w-full max-w-61'>
            <Button label='Modifier les informations' />
          </div>
          <form action={logout} className='h-13 w-full max-w-45'>
            <Button label='Se déconnecter' variant='outline' />
          </form>
        </div>
      </section>
    </main>
  );
}
