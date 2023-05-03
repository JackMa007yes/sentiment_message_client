import React from 'react';
import { useStore } from '@/store';
import Avatar from '@/components/Avatar';

type Props = {
  data: IMessage;
  user?: User;
};

export default function MessagePopup({ data, user }: Props) {
  const mine = useStore(state => state.user);
  return (
    <div
      // className={`rounded-lg p-2 px-4 m-2 bg-white w-full border
      //   // data.userId !== user?.id ? 'float-left bg-green-700' : 'float-right'
      //  `}
      className={`mb-6 flex justify-end ${data.userId === mine?.id ? '' : 'flex-row-reverse'}`}
      // style={{
      //   // background: 'rgba( 255, 255, 255, 0.35 )',
      //   // boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
      //   // backdropFilter: 'blur( 11.5px )',
      //   // '-webkitBackdropFilter': 'blur( 11.5px )',
      //   borderRadius: '22px',
      //   backgroundColor: 'rgba(0,0,0,0)',

      //   border: '1px solid rgba( 255, 255, 255, 1 )',
      //   color: 'white'
      // }}
    >
      <section
        className={`text-white px-4 py-3 leading-8 rounded-2xl max-w-[52%] ${
          data.userId === mine?.id ? 'bg-[#6b8afd]' : 'bg-[#2e343d]'
        }`}
      >
        {data.message}
      </section>
      <Avatar user={user} className={`w-12 h-12  ${data.userId === mine?.id ? 'ml-4' : 'mr-4'}`}></Avatar>
    </div>
  );
}
