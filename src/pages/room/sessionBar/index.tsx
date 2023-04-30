import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Search from './Search';
import { GetSessionList, GetUserList } from '@/api';
import UserList from './UserList';
import AddUserModal from '@/components/AddUserModal';
import TopBar from './TopBar';

type Props = {
  current: User | null;
  onSelect: (selected: User) => void;
};
export default function SessionBar({ current, onSelect }: Props) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [userList, setUserList] = useState<User[]>([]);

  const {
    data: sessionList,
    isLoading,
    refetch
  } = useQuery(['GetSessionList'], () => GetSessionList(), {
    initialData: []
  });

  console.log(sessionList, 22);

  return (
    <div className='text-white w-96 h-screen p-6'>
      <TopBar onInput={setSearchWord} onAdd={() => setModalDisplay(true)} />
      <UserList data={sessionList} current={current} onSelect={onSelect} />
      <AddUserModal open={modalDisplay} onClose={() => setModalDisplay(false)} onAdd={() => refetch()} />
    </div>
  );
}
