import { FC } from 'react';
import { useStore } from '@/store';
import Avatar from '@/components/Avatar';
import Settings from './settings';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-screen h-screen flex bg-[#2e343d] justify-between'>
      <section className='flex flex-col justify-between px-4 py-8'>
        <Avatar />
        <Settings></Settings>
      </section>
      <section className='flex-1 bg-[#202329]  rounded-l-[28px] overflow-hidden'>{children}</section>
    </div>
  );
};

export default Layout;
