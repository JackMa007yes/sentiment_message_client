import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { GetProfile, GetSessionList } from '@/api';
import { useSocket } from '@/hooks/useSocket';
import { useIsPC } from '@/hooks/useIsPC';
import MobileLayout from '../mobile/layout';
import PCLayout from '../PC/layout';

export default function Layout() {
  const { setProfile, setSessionList, setUpdatedSessionMap } = useStore(state => state);
  const isPC = useIsPC();

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

  return isPC ? <PCLayout /> : <MobileLayout />;
}
