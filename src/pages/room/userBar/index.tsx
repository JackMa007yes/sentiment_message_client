import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Search from './Search';
import { GetUserList } from '@/api';
import UserList from './UserList';

type Props = {
  current: UserListItem | null;
  onSelect: (selected: UserListItem) => void;
};
export default function UserBar({ current, onSelect }: Props) {
  const [searchWord, setSearchWord] = useState('');

  const { data: userList } = useQuery(['GetUserList'], () => GetUserList({}), {
    initialData: []
  });

  return (
    <div className='text-white w-96 h-screen p-6'>
      <Search onInput={setSearchWord} />
      <UserList data={userList} current={current} onSelect={onSelect} />
    </div>
  );
}
