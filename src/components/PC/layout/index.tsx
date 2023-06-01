import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Progress from '@/components/ui/Progress';
import SideBar from './SideBar';

export default function PCLayout() {
  return (
    <div className='flex'>
      <SideBar />
      <section className='flex-1 bg-primary-bg'>
        <Suspense fallback={<Progress />}>
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
}
