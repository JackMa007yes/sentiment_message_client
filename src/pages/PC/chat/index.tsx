import Room from '@/pages/chat/room';
import SessionBar from '@/pages/chat/sessionBar';

export default function PCChat() {
  return (
    <div className='flex justify-between bg-primary-bg h-screen'>
      <SessionBar />
      <Room />
    </div>
  );
}
