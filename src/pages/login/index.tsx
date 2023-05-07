import { useState } from 'react';
import LoginPannel from './LoginPannel';
import SignUpPannel from './SignUpPannel';
import memojiBg from '@/assets/img/memoji.jpg';

enum PannelType {
  LOGIN = 'logIn',
  SIGNUP = 'signUp'
}
export default function LoginPage() {
  const [curPannel, setCurPannel] = useState<PannelType>(PannelType.LOGIN);
  return (
    <div className="w-screen min-w-[1200px] min-h-[600px] text-white h-screen bg-[#26282d] relative bg-[url('../../assets/img/memoji.jpg')]">
      <img
        src={memojiBg}
        alt=''
        className='absolute right-0 h-full top-0 object-cover -mr-28 hover:scale-105 transition-all duration-700'
      ></img>
      <span className='absolute right-10 bottom-4 text-primary-text text-xs '>Image Source: Apple</span>
      <div className='w-[45%] h-full bg-[#26282d] z-2 absolute left-0 top-0 border-red-300 flex items-center justify-center'>
        <section className='w-1/2'>
          {curPannel === PannelType.LOGIN ? (
            <LoginPannel onJump={() => setCurPannel(PannelType.SIGNUP)} />
          ) : (
            <SignUpPannel onJump={() => setCurPannel(PannelType.LOGIN)} />
          )}
        </section>
      </div>
    </div>
  );
}
