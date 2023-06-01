import { useState } from 'react';
import LoginPannel from './LoginPannel';
import SignUpPannel from './SignUpPannel';
import memojiBg from '@/assets/img/memoji.jpg';
import { useIsPC } from '@/hooks/useIsPC';

const WrapperClassMap = {
  PC: 'w-screen min-w-[1200px] min-h-[600px] text-white h-screen bg-[#26282d] relative',
  mobile: 'w-screen h-full text-white bg-[#26282d]'
};

enum PannelType {
  LOGIN = 'logIn',
  SIGNUP = 'signUp'
}
export default function LoginPage() {
  const isPC = useIsPC();
  const [curPannel, setCurPannel] = useState<PannelType>(PannelType.LOGIN);
  return (
    <div className={isPC ? WrapperClassMap.PC : WrapperClassMap.mobile}>
      {isPC ? (
        <>
          <img
            src={memojiBg}
            alt=''
            className='absolute right-0 h-full top-0 object-cover -mr-28 hover:scale-105 transition-all duration-700'
          ></img>
          <span className='absolute right-10 bottom-4 text-primary-text text-xs '>Image Source: Apple</span>
        </>
      ) : null}

      <div
        className={`${
          isPC ? 'w-[45%]' : 'w-full'
        }  h-full bg-[#26282d] z-2 absolute left-0 top-0 border-red-300 flex items-center justify-center`}
      >
        <section className={`${isPC ? 'w-1/2' : 'w-3/4'}`}>
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
