import Footer from '../../components/Footer';
import Header from '../../components/Header';

export default function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-screen flex-col overflow-hidden'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
