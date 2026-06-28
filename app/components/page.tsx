// Dependencies.
import type { ReactNode } from 'react';

// Types.
interface Preview {
  name: string;
  render: () => ReactNode;
}

////////////////////////////////////////////////////////////

// Components.
import BrandLogo from '../../components/BrandLogo';

// Preview list.
const previews: Preview[] = [
  { name: 'Brand Logo Primary', render: () => <BrandLogo className='w-full h-full' /> },
  { name: 'Brand Logo Black', render: () => <BrandLogo variant='black' className='w-full h-full' /> },
];

////////////////////////////////////////////////////////////

// Component preview frame.
function PreviewFrame({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className='flex flex-col gap-3'>
      <h5 className='font-heading text-h5 text-grey-600 uppercase tracking-widest'>{name}</h5>
      <div className='preview-frame relative overflow-auto p-6' style={{ resize: 'both', minHeight: '4rem', minWidth: '8rem', maxWidth: '100%' }}>
        <div className='size-full border-4 border-dashed border-grey-200 rounded-xl bg-white'>
          {children}
        </div>
        <div className='pointer-events-none absolute bottom-0 right-0 size-4 rounded-full bg-white border-2 border-grey-600 shadow-sm flex items-center justify-center'>
          <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M3.5 3.5L8.5 8.5' stroke='#6B7280' strokeWidth='1.5' strokeLinecap='round' />
            <path d='M3.5 6V3.5H6' stroke='#6B7280' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M8.5 6V8.5H6' stroke='#6B7280' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </div>
      </div>
    </section>
  );
}

// Component preview page.
export default function ComponentsPage() {
  return (
    <div className='min-h-screen bg-grey-50 p-8 md:p-12'>
      <div className='max-w-4xl mx-auto flex flex-col gap-10'>

        {/* Page header */}
        <header className='flex flex-col gap-2 pb-6 border-b border-grey-200'>
          <h1 className='text-h1 text-grey-950'>Components</h1>
          <p className='text-body-m text-grey-600'>
            Dev-only component preview. Drag the bottom-right corner of each frame to resize.
          </p>
        </header>

        {/* Component preview area */}
        <div className='flex flex-col gap-10'>
          {previews.map(({ name, render }, index) => (
            <PreviewFrame key={`${index}-${name}`} name={name}>
              {render()}
            </PreviewFrame>
          ))}
        </div>
      </div>
    </div>
  );
}
