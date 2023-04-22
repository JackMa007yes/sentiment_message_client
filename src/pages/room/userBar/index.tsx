import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Search from './Search';
import { GetUserList } from '@/api';
import UserList from './UserList';
import AddUserModal from '@/components/AddUserModal';
import TopBar from './TopBar';

type Props = {
  current: UserListItem | null;
  onSelect: (selected: UserListItem) => void;
};
export default function UserBar({ current, onSelect }: Props) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [userList, setUserList] = useState<UserListItem[]>([]);

  useQuery(['GetUserList'], () => GetUserList({}), {
    onSuccess: data => {
      setUserList(data.data);
    }
  });

  return (
    <div className='text-white w-96 h-screen p-6'>
      <TopBar onInput={setSearchWord} onAdd={() => setModalDisplay(true)} />
      <UserList data={userList} current={current} onSelect={onSelect} />
      <AddUserModal open={modalDisplay} onClose={() => setModalDisplay(false)} />
    </div>
  );
}
