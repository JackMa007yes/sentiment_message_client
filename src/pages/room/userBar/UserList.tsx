import React from 'react';
import UserCard from './UserCard';

type Props = {
  data: UserListItem[];
  current: UserListItem | null;
  onSelect: (selected: UserListItem) => void;
};
export default function UserList({ data, current, onSelect }: Props) {
  return (
    <div className='pt-6'>
      {data.map(item => {
        return <UserCard key={item.id} data={item} selected={current?.id === item.id} onSelect={onSelect} />;
      })}
    </div>
  );
}
