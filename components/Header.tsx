'use client';

import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import DashboardPrimary from '../assets/images/dashboard-icon-primary.svg';
import DashboardWhite from '../assets/images/dashboard-icon-white.svg';
import FolderPrimary from '../assets/images/folder-icon-primary.svg';
import FolderWhite from '../assets/images/folder-icon-white.svg';
import BrandLogo from './BrandLogo';
import MenuItem from './MenuItem';
import UserIcon from './UserIcon';

// Header component.
export default function Header(props: {
  activeItem?: 'dashboard' | 'projects',
  initials?: string
}) {
  const pathname = usePathname();
  const dashActive = props.activeItem === 'dashboard' || (!props.activeItem && pathname.startsWith('/dashboard'));
  const projActive = props.activeItem === 'projects' || (!props.activeItem && pathname.startsWith('/projects'));
  return (
    <header className='flex items-center justify-between gap-2 w-full h-24 px-4 sm:px-8 lg:px-25 bg-white shadow-[0_4px_12px_1px_rgba(0,0,0,0.08)]'>
      <div className='h-4 w-31 shrink-0 sm:h-5 sm:w-37'>
        <BrandLogo />
      </div>
      <nav className='flex items-center gap-2 lg:gap-4'>
        <MenuItem
          label='Tableau de bord'
          href='/dashboard'
          active={dashActive}
          icon={<Image className='w-6 h-6' alt='' src={dashActive ? DashboardWhite : DashboardPrimary} />}
        />
        <MenuItem
          label='Projets'
          href='/projects'
          active={projActive}
          icon={<Image className='w-7 h-6' alt='' src={projActive ? FolderWhite : FolderPrimary} />}
        />
      </nav>
      <NextLink href='/account' className='h-11 w-11 shrink-0 sm:h-16 sm:w-16'>
        <UserIcon initials={props.initials ?? '??'} />
      </NextLink>
    </header>
  );
}
