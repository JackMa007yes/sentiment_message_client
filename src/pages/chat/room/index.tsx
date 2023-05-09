import { memo, useEffect, useRef, useState } from 'react';
import { SentimentController, SentimentScore } from '@/utils/video/sentimentController';
import { useQuery } from '@tanstack/react-query';
import { GetRoomMessage } from '@/api';
import Input from './Input';
import { useStore } from '@/store';
import MessagePopup from './MessagePopup';
import { MaleVideoSource } from '@/constants/video';
import { IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import Avatar from '@/components/ui/Avatar';

type Props = {
  onSend: (message: any) => void;
  socketMessageList: IMessage[];
};
function Room({ onSend, socketMessageList }: Props) {
  const { profile, session } = useStore(state => state);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [inEditMessage, setInEditMessage] = useState<string>('');
  const messageBoxRef = useRef(null);

  const videoController = useRef<SentimentController | null>(null);
  const videoRomRef = useRef<HTMLVideoElement | null>(null);

  useQuery(['GetRoomMessage', limit, page, session?.room.id], () => GetRoomMessage(session!.room.id, { limit, page }), {
    enabled: !!session?.room.id,
    onSuccess: data => {
      const sortedMessageList = data.data.sort((pre, cur) => pre.id - cur.id);
      setMessageHistory(sortedMessageList);
    }
  });

  useEffect(() => {
    setMessageHistory([]);
  }, [session]);

  useEffect(() => {
    const box = messageBoxRef.current as null | HTMLElement;
    if (box) {
      box.scrollTop = box.scrollHeight;
    }

    const lastReceiveMessage = [...messageHistory, ...socketMessageList].reverse().find(message => {
      return message.userId !== profile?.id;
    });
    if (lastReceiveMessage) {
      const score = String(lastReceiveMessage.sentiment_score) as SentimentScore;
      videoController.current?.trigger(score);
    }
  }, [socketMessageList, messageHistory]);

  useEffect(() => {
    videoController.current = new SentimentController(videoRomRef.current!, MaleVideoSource.SentimentClipMap);
    videoController.current.trigger(SentimentScore.peaceful);
  }, []);

  const sendMessage = (val: string) => {
    if (!val) return;
    onSend({
      type: 'addMessage',
      payload: {
        roomId: session?.room.id,
        userId: session?.fromUser.id,
        message: val
      }
    });
    setInEditMessage('');
  };

  return (
    <div className='mr-8 my-10 rounded-t-[24px] flex-1 h-[calc(100vh-30px)] pb-8 flex rounde flex-col overflow-hidden bg-[#1d1e24]'>
      <section className='text-white text-xl h-20 font-bold px-8 flex items-center justify-between bg-[#16171b]'>
        <span className='flex justify-start items-center gap-4'>
          <Avatar
            user={session?.toUser || null}
            className='w-12 g-12 rounded-[50%] overflow-hidden inline-block'
          ></Avatar>
          {session?.toUser.name}
        </span>
        <IconButton aria-label='delete' color='primary'>
          <MoreHoriz sx={{ color: 'white' }} />
        </IconButton>
      </section>
      <section className='w-full flex-1 flex justify-between flex-col'>
        <section className='flex-1 relative p-8'>
          <div className='w-full h-full overflow-auto absolute left-0 top-0 flex justify-center items-center mix-blend-screen'>
            <video ref={videoRomRef} src={MaleVideoSource.video} muted={true}></video>
            {/* <video ref={videoRomRef} className='' muted={true}></video> */}
          </div>
          <div className='w-full h-full overflow-auto absolute left-0 top-0 px-10 p-4' ref={messageBoxRef}>
            {[...messageHistory, ...socketMessageList].map((item: IMessage) => {
              return (
                <MessagePopup
                  data={item}
                  user={item.userId === profile?.id ? session?.fromUser : session?.toUser}
                  key={item.id}
                ></MessagePopup>
              );
            })}
          </div>
        </section>
        {session && <Input value={inEditMessage} onChange={setInEditMessage} send={sendMessage} />}
      </section>
    </div>
  );
}

export default memo(Room);
