import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import Link from '../components/Link';
import Tag from '../components/Tag';

// Not found page.
export default function NotFound() {
  return (
    <main className='flex flex-1 flex-col items-center justify-center gap-12 px-6 py-16'>

      {/* Brand */}
      <div className='h-6 w-45 max-w-full shrink-0'>
        <BrandLogo />
      </div>

      {/* Message card */}
      <section className='flex w-full max-w-150 flex-col items-center gap-8 rounded-xl border border-grey-200 bg-white px-6 py-12 text-center sm:px-15 shadow-[0_4px_12px_1px_rgba(0,0,0,0.08)]'>

        {/* Message */}
        <div className='flex flex-col items-center gap-4'>
          <Tag color='brand' label='Erreur 404' />
          <h1 className='font-heading text-h2 text-brand-dark'>Page introuvable</h1>
          <p className='font-body text-body-l text-grey-600'>
            La page que vous recherchez n’existe pas, a été déplacée, ou ne vous est plus accessible.
          </p>
        </div>

        {/* Ways out */}
        <div className='flex w-full flex-col items-center gap-6'>
          <div className='h-13 w-full max-w-84'>
            <Button label='Revenir au tableau de bord' href='/dashboard' />
          </div>
          <Link label='Voir mes projets' href='/projects' />
        </div>
      </section>
    </main>
  );
}
