import Room from '@/pages/chat/room';
import SessionBar from '@/pages/chat/sessionBar';
import { useStore } from '@/store';

export default function MobileChat() {
  const { session } = useStore(state => state);

  return (
    // <div className='h-[100dvh] w-screen flex'>
    //   <section className={`overflow-hidden flex-0 transition-all h-[100dvh] ${session ? 'w-0' : 'w-full pb-16 '}`}>
    //     <SessionBar />
    //   </section>
    //   <section className={`overflow-hidden flex-0 transition-all h-[100dvh] ${!session ? 'w-0' : ' w-full pb-5 '}`}>
    //     <Room />
    //   </section>
    // </div>
    <div className='h-[100dvh] '>
      {/* <h1 className='text-5xl text-white p-8 pb-0 -mb-2'>Chat</h1> */}
      <div className={`flex h-full w-[200vw] transition-all ${session ? '-ml-[100vw]' : ''}`}>
        <section className={`flex-0 w-screen pb-16 overflow-hidden h-full`}>
          <SessionBar />
        </section>
        <section className={`flex-0 w-screen pb-5 overflow-hidden h-full`}>
          <Room />
        </section>
      </div>
    </div>
  );
}
