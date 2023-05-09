import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import SideBar from './SideBar';
import { useQuery } from '@tanstack/react-query';
import { GetProfile } from '@/api';

export default function Layout() {
  const setProfile = useStore(state => state.setProfile);

  useQuery(['GetProfile'], GetProfile, {
    onSuccess: setProfile
  });

  return (
    <div className='flex'>
      <SideBar />
      <section className='flex-1'>
        <Outlet />
      </section>
    </div>
  );
}
