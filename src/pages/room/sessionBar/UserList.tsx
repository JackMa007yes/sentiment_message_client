import React from 'react';
import UserCard from './UserCard';

type Props = {
  data: Session[];
  current: User | null;
  onSelect: (selected: User) => void;
};
export default function UserList({ data, current, onSelect }: Props) {
  return (
    <div className='pt-6 overflow-auto scroll-smooth scroll-p-0 h-[800px]'>
      {data.map(item => {
        return <UserCard key={item.id} data={item} selected={current?.id === item.id} onSelect={onSelect} />;
      })}
    </div>
  );
}
