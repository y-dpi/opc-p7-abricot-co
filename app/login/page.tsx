import Image from 'next/image';

import LoginBackground from '../../assets/images/login-background.png';
import BrandLogo from '../../components/BrandLogo';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Link from '../../components/Link';

// Login page.
export default function LoginPage() {
  return (
    <main className='flex min-h-screen'>

      {/* Form panel */}
      <section className='flex w-full flex-col justify-center bg-grey-50 px-6 py-14 lg:w-150 lg:shrink-0 lg:px-35'>
        <div className='mx-auto flex w-full max-w-100 flex-col gap-16 lg:max-w-none'>
          <div className='mx-auto h-8 w-63 max-w-full'>
            <BrandLogo />
          </div>

          <div className='flex flex-col items-center gap-8'>
            <h1 className='font-heading text-h1 text-brand-dark'>Connexion</h1>
            <div className='flex w-full flex-col gap-8'>
              <div className='flex flex-col gap-7'>
                <Input label='Email' type='email' />
                <Input label='Mot de passe' type='password' />
              </div>
              <div className='h-13 w-[80%] self-center'>
                <Button label='Se connecter' />
              </div>
            </div>
            <Link label='Mot de passe oublié?' href='#' />
          </div>

          <div className='flex items-center justify-center gap-3'>
            <span className='font-body text-body-s text-grey-950'>Pas encore de compte ?</span>
            <Link label='Créer un compte' href='/register' />
          </div>
        </div>
      </section>

      {/* Background image */}
      <div className='relative hidden flex-1 lg:block'>
        <Image src={LoginBackground} alt='' fill priority className='object-cover' />
      </div>
    </main>
  );
}
