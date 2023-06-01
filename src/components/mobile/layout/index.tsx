import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Progress from '@/components/ui/Progress';
import BottomNavigation from './BottomNavigation';
import { useStore } from '@/store';

export default function MobileLayout() {
  const { session } = useStore(state => state);
  const BottomNavigationDisplay = location.pathname !== '/app/chat' || !session;

  return (
    <div className='h-[100dvh]'>
      <section className='h-full bg-primary-bg'>
        <Suspense fallback={<Progress />}>
          <Outlet />
        </Suspense>
      </section>
      {BottomNavigationDisplay ? <BottomNavigation /> : null}
    </div>
  );
}
