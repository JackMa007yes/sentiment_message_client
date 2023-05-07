import { FC, memo } from 'react';
import Avatar from '@/pages/users/Avatar';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { GetProfile } from '@/api';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useStore(state => state);
  useQuery(['GetProfile'], GetProfile, {
    onSuccess: setUser
  });

  return (
    <div className='w-screen h-screen flex bg-[#2e343d] justify-between'>
      <section className='flex flex-col justify-between px-4 py-8'>
        <Avatar user={user} className='w-14 h-14' />
      </section>
      <section className='flex-1 bg-[#202329]  rounded-l-[28px] overflow-hidden'>{children}</section>
    </div>
  );
};

export default memo(Layout);
