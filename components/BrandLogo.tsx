import Image from 'next/image';

import BrandLogoBlack from '../assets/images/brand-logo-black.svg';
import BrandLogoPrimary from '../assets/images/brand-logo-primary.svg';
import BrandLogoWhite from '../assets/images/brand-logo-white.svg';

// Types.
type BrandLogoVariant = 'black' | 'primary' | 'white';

// Brand logo component.
export default function BrandLogo(props: {
  variant?: BrandLogoVariant,
  className?: string
}) {
  return (
    <Image
      className='w-full h-full'
      alt='Abricot brand logo'
      loading='eager'
      src={
        (props.variant === 'black')
          ? BrandLogoBlack
          : (props.variant === 'white')
            ? BrandLogoWhite
            : BrandLogoPrimary
      }
    />
  );
}