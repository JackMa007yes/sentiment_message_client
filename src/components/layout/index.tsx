import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import SideBar from './SideBar';
import { useQuery } from '@tanstack/react-query';
import { GetProfile, GetSessionList } from '@/api';
import { useSocket } from '@/hooks/useSocket';
import Progress from '../ui/Progress';

export default function Layout() {
  const { setProfile, setSessionList, setUpdatedSessionMap } = useStore(state => state);

  useSocket();

  useQuery(['GetProfile'], GetProfile, {
    onSuccess: setProfile
  });

  useQuery(['GetSessionList'], () => GetSessionList(), {
    initialData: [],
    onSuccess(data) {
      const res = data.sort(
        (pre, cur) =>
          new Date(cur.lastMessageTime || cur.createTime).getTime() -
          new Date(pre.lastMessageTime || pre.createTime).getTime()
      );
      setUpdatedSessionMap({});
      setSessionList(res);
    }
  });

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
