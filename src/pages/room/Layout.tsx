import { FC } from 'react';
import { useStore } from '@/store';
import Avatar from '@/components/Avatar';

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-screen h-screen flex bg-[#2e343d] justify-between'>
      <Avatar />
      <section className='flex-1 bg-[#202329]  rounded-l-[40px] overflow-hidden'>{children}</section>
    </div>
  );
};

export default Layout;
