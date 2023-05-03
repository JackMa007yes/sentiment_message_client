import { memo, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Search from './Search';
import { GetSessionList, GetUserList } from '@/api';
import SessionList from './SessionList';
import AddUserModal from '@/components/AddUserModal';
import TopBar from './TopBar';

type Props = {
  current: Session | null;
  onSelect: (selected: Session) => void;
};
function SessionBar({ current, onSelect }: Props) {
  const [searchWord, setSearchWord] = useState('');
  const [filterSessionList, setFilterSessionList] = useState<Session[]>([]);

  const { data: sessionList, refetch } = useQuery(['GetSessionList'], () => GetSessionList(), {
    initialData: [],
    select(data) {
      return data.sort(
        (pre, cur) =>
          new Date(cur.lastMessageTime || cur.createTime).getTime() -
          new Date(pre.lastMessageTime || pre.createTime).getTime()
      );
    }
  });

  useEffect(() => {
    setFilterSessionList(sessionList.filter(session => session.toUser.name.includes(searchWord)));
  }, [searchWord, sessionList]);

  return (
    <div className='text-white w-[440px] h-screen p-6'>
      <TopBar onInput={setSearchWord} onAdd={refetch} />
      <SessionList data={filterSessionList} current={current} onSelect={onSelect} />
    </div>
  );
}

export default memo(SessionBar);
