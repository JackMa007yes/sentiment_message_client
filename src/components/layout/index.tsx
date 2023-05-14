import { Outlet } from 'react-router-dom';
import { useStore } from '@/store';
import SideBar from './SideBar';
import { useQuery } from '@tanstack/react-query';
import { GetProfile, GetSessionList } from '@/api';

export default function Layout() {
  const { setProfile, setSessionList } = useStore(state => state);

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
      setSessionList(res);
    }
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
