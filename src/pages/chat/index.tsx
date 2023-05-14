import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { checkSessionMessage, GetSessionList } from '@/api';
import { useStore } from '@/store';
import { useSocket } from '@/hooks/useSocket';
import SessionBar from './sessionBar';
import Room from './room';

export default function index() {
  const { session } = useStore(store => store);
  const { client, socketMessageList, updatedSessionMap } = useSocket(session);

  const { mutateAsync: checkMessageMutate } = useMutation(['checkSessionMessage'], checkSessionMessage);

  const seedMessage = (message: any) => {
    client?.emit('message', message);
  };

  useEffect(() => {
    session && client?.emit('joinRoom', { userId: session.fromUser.id, roomId: session.room.id });
    session && session.unreadCount && checkMessageMutate(session.id);
  }, [session]);

  return (
    <div className='flex justify-between bg-primary-bg'>
      <SessionBar updatedSession={updatedSessionMap} />
      <Room onSend={seedMessage} socketMessageList={socketMessageList} />
    </div>
  );
}
