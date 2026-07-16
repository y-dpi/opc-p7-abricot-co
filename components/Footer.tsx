import BrandLogo from './BrandLogo';

// Footer component.
export default function Footer() {
  return (
    <footer className='flex items-center justify-between w-full h-17 px-8 bg-white'>
      <div className='w-25 h-3'>
        <BrandLogo variant='black' />
      </div>
      <span className='font-body text-body-m text-grey-950'>Abricot 2025</span>
    </footer>
  );
}
