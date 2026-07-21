import Image from 'next/image';

import SigninBackground from '../../assets/images/signin-background.png';
import BrandLogo from '../../components/BrandLogo';
import Link from '../../components/Link';
import RegisterForm from '../../components/RegisterForm';

// Register page.
export default function RegisterPage() {
  return (
    <main className='flex min-h-screen'>

      {/* Form panel */}
      <section className='flex w-full flex-col justify-center bg-grey-50 px-6 py-14 lg:w-150 lg:shrink-0 lg:px-35'>
        <div className='mx-auto flex w-full max-w-100 flex-col gap-16 lg:max-w-none'>
          <div className='mx-auto h-8 w-63 max-w-full'>
            <BrandLogo />
          </div>

          <div className='flex flex-col items-center gap-8'>
            <h1 className='font-heading text-h1 text-brand-dark'>Inscription</h1>
            <RegisterForm />
          </div>

          <div className='flex items-center justify-center gap-3'>
            <span className='font-body text-body-s text-grey-950'>Déjà inscrit ?</span>
            <Link label='Se connecter' href='/login' />
          </div>
        </div>
      </section>

      {/* Background image */}
      <div className='relative hidden flex-1 lg:block'>
        <Image src={SigninBackground} alt='' fill priority className='object-cover' />
      </div>
    </main>
  );
}
