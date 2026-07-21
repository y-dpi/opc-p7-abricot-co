import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { requireSession } from '../../middleware/session';
import toInitials from '../../utils/toInitials';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  // Enforce authentication for routes using this layout.
  const { user } = await requireSession();

  return (
    <div className='flex min-h-screen flex-col overflow-hidden'>
      <Header initials={toInitials(user.name, user.email)} />
      {children}
      <Footer />
    </div>
  );
}
