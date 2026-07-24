import { logout, updatePassword, updateProfile } from '../../../actions/auth';
import AccountForm from '../../../components/AccountForm';
import Button from '../../../components/Button';
import PasswordForm from '../../../components/PasswordForm';
import { requireSession } from '../../../middleware/session';
import { getProfile } from '../../../models/auth';

// Account page.
export default async function AccountPage() {
  const { token, user } = await requireSession();

  // Fetch the latest profile, falling back to the session user.
  const body = await getProfile(token);
  const profile = body.success && body.data?.user ? body.data.user : user;
  const name = profile.name ?? '';

  return (
    <main className='mx-auto flex w-full max-w-360 flex-1 flex-col gap-8 px-6 py-16 lg:px-25'>
      <section className='flex flex-col gap-10 rounded-xl border border-grey-200 bg-white px-5 md:px-15 py-10'>

        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h1 className='font-heading text-h5 text-grey-800'>Mon compte</h1>
          <p className='font-body text-body-m text-grey-600'>{name || profile.email}</p>
        </div>

        {/* Form */}
        <AccountForm name={name} email={profile.email} action={updateProfile} />
      </section>

      <section className='flex flex-col gap-10 rounded-xl border border-grey-200 bg-white px-5 md:px-15 py-10'>

        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h2 className='font-heading text-h5 text-grey-800'>Mot de passe</h2>
          <p className='font-body text-body-m text-grey-600'>Modifiez votre mot de passe</p>
        </div>

        {/* Form */}
        <PasswordForm action={updatePassword} />
      </section>

      {/* Logout */}
      <form action={logout} className='h-13 w-full max-w-45'>
        <Button label='Se déconnecter' variant='outline' />
      </form>
    </main>
  );
}
